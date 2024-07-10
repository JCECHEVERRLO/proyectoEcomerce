//Crear un enrutador de express en el que todas las rutas inician con api
const router = require('express').Router();
const {validatorHandler} = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/products.schema');
const { getCategorySchema } = require('../schemas/categories.schema')
const {ReadLog} = require('../middlewares/LogLogin.handler')
//Importar el controlador de eventos
const service = require('../services/products.service');
const serviceCategories = require('../services/categories.service');


router.use((req, res, next)=>{
    if(req.user){
        next() 
    }
    else {
        //console.log(req)
        req.session.returnTo = req.originalUrl; //Create session value with requested url
        res.redirect('/auth/signIn')
    } 
})

//Definir las rutas de la aplicación
router.get('/', async (req,res)=>{
    const products = await service.index()

    const Log = await ReadLog()
    let cadena = Log.split(" ")
    const RoleId = cadena[2]
    res.render('products/products', {
        products: products,
        RoleId: RoleId
    });
});
router.get('/', async (req, res) => {
    try {
        let products;

        if (req.query.id && req.query.id !== 'all') {
           
            products = await models.product.findAll({
                where: { 
                    id: req.query.id, 
                }
            });
        } else {
           
            products = await models.product.findAll();
        }

        res.render('products/indexUser', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de juegos.' });
    }
});

//Abrir vista de crear accesorio
router.get('/create', async (req,res)=>{
    const categories = await serviceCategories.index()
    res.render('products/create', {
        categories: categories
    });
});

//Mostrar vista con el registro solicitado
router.get('/show/:id', 
    validatorHandler(getProductSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const product = await service.show(id)
        const category = await serviceCategories.show(product.id_category)
        res.render('products/show', {
            product: product,
            category: category.dataValues
        });
        //res.json(event)
    }
);

//Mostrar vista con el registro solicitado para EDITAR
router.get('/edit/:id', 
    validatorHandler(getProductSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const product = await service.show(id)
        const categories = await serviceCategories.index()
        res.render('products/edit', {
            product: product,
            categories: categories
        });
        //res.json(event)
    }
);

//Agregar accesorio
router.post('/', 
    validatorHandler(createProductSchema, 'body'),
    async (req,res)=>{
        const body = req.body
        const product = await service.store(body)
        res.redirect("/admin/products")
    }
);

router.post('/:id', 
    validatorHandler(updateProductSchema, 'body'),
    async (req,res)=>{
        const id = req.params.id
        const body = req.body
        const product = await service.update(id, body)
        res.redirect("/admin/products")
    }
);

router.get('/destroy/:id', 
    validatorHandler(getProductSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const product = await service.destroy(id)
        res.redirect('/admin/products')
    }
);

//Exportar el enrutador
module.exports = router;
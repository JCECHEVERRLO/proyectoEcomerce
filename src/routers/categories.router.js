//Crear un enrutador de express en el que todas las rutas inician con api
const router = require('express').Router();
const {validatorHandler} = require('../middlewares/validator.handler');
const { getCategorySchema, createCategorySchema, updateCategorySchema } = require('../schemas/categories.schema');
//Importar el controlador de eventos
const service = require('../services/categories.service');
const {ReadLog} = require('../middlewares/LogLogin.handler')

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
    const categories = await service.index()
    const Log = await ReadLog()
    let cadena = Log.split(" ")
    const RoleId = cadena[2]
    res.render('categories/categories', {
        categories: categories,
        RoleId: RoleId 
    });
});

//Abrir vista de crear accesorio
router.get('/create', async (req,res)=>{
    res.render('categories/create', {
    });
});

//Mostrar vista con el registro solicitado
router.get('/:id', 
    validatorHandler(getCategorySchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const category = await service.show(id)
        res.render('categories/show', {
            category: category
        });
        //res.json(event)
    }
);

//Mostrar vista con el registro solicitado para EDITAR
router.get('/edit/:id', 
    validatorHandler(getCategorySchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const category = await service.show(id)
        res.render('categories/edit', {
            category: category
        });
        //res.json(event)
    }
);

//Agregar accesorio
router.post('/', 
    validatorHandler(createCategorySchema, 'body'),
    async (req,res)=>{
        const body = req.body
        const category = await service.store(body)
        res.redirect("/admin/categories")
    }
);

router.post('/:id', 
    validatorHandler(updateCategorySchema, 'body'),
    async (req,res)=>{
        const id = req.params.id
        const body = req.body
        const category = await service.update(id, body)
        res.redirect("/admin/categories")
    }
);

router.get('/destroy/:id', 
    validatorHandler(getCategorySchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const category = await service.destroy(id)
        res.redirect('/admin/categories')
    }
);

//Exportar el enrutador
module.exports = router;
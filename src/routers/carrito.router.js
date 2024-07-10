//Crear un enrutador de express en el que todas las rutas inician con api
const router = require('express').Router();
const {validatorHandler} = require('../middlewares/validator.handler');
const { createShoppingCarSchema, getShoppingCarSchema } = require('../schemas/carrito.schema');
//Importar el controlador de eventos
const service = require('../services/carrito.service');
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
    // const id = req.params.id
    const Log = await ReadLog()
    let cadena = Log.split(" ")
    const userId = cadena[1].split("\n")[0]
    const ShoppingCar = await service.index(userId)
    
    const RoleId = cadena[2]
    res.render('carrito/carrito', {
        ShoppingCar: ShoppingCar,
        RoleId: RoleId
    });
});

//Mostrar vista con el registro solicitado
router.get('/:id', 
    validatorHandler(getShoppingCarSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const ShoppingCar = await service.show(id)
        res.render('carrito/show', {
            ShoppingCar: ShoppingCar
        });
        //res.json(event)
    }
);

//Agregar accesorio
router.post('/', 
    validatorHandler(createShoppingCarSchema, 'body'),
    async (req,res)=>{
        const body = req.body
        const ShoppingCar = await service.store(body)
        res.redirect("/ShoppingCar")
    }
);


router.get('/destroy/:id', 
    validatorHandler(getShoppingCarSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const ShoppingCar = await service.destroy(id)
        res.redirect('/carrito/carrito')
    }
);

//Exportar el enrutador
module.exports = router;
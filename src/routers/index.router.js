//Crear un enrutador de express en el que todas las rutas inician con api
const router = require('express').Router();
//Importar el controlador de eventos
const service = require('../services/products.service');
const {ReadLog} = require('../middlewares/LogLogin.handler')

//Definir las rutas de la aplicación
router.get('/', async (req,res)=>{
    var products = await service.index()
    if(req.query.name){
        products = await service.filter(req.query.name)
    }

    const Log = await ReadLog()
    let cadena = Log.split(" ")
    const userId = cadena[1].split("\n")[0]
    const RoleId = cadena[2]
   
    res.render('IndexProducts', {
        products: products, 
        RoleId: RoleId,
        userId: userId
    });
});
/*
router.get('/ruta/buscar', async (req,res)=>{
    console.log("..............." + req.query.name)
    const products = await service.filter(req.query.name)
    res.render('IndexProducts', {
        products: products
    });
});*/

router.get('/show/:id', async (req,res)=>{
    const product = await service.show(req.params.id)
    res.render('ShowProducts', {
        product: product
    });
});

//Exportar el enrutador
module.exports = router;
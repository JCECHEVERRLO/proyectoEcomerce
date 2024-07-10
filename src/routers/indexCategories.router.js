//Crear un enrutador de express en el que todas las rutas inician con api
const router = require('express').Router();
//Importar el controlador de eventos
const service = require('../services/categories.service');
const {ReadLog} = require('../middlewares/LogLogin.handler')

//Definir las rutas de la aplicación
router.get('/', async (req,res)=>{
    const categories = await service.index()
    const Log = await ReadLog()
    let cadena = Log.split(" ")
    const RoleId = cadena[2]
    res.render('IndexCategories', {
        categories: categories,
        RoleId: RoleId 
    });
});

router.get('/show/:id', async (req,res)=>{
    const category = await service.show(req.params.id)
    res.render('ShowCategories', {
        category: category
    });
});

//Exportar el enrutador
module.exports = router;
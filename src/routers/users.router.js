//Crear un enrutador de express en el que todas las rutas inician con api
const router = require('express').Router();
const {validatorHandler} = require('../middlewares/validator.handler');
const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/users.schema');
//Importar el controlador de eventos
const service = require('../services/users.service');

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
    const users = await service.index()
    res.render('users/users', {
        users: users
    });
});

//Abrir vista de crear accesorio
router.get('/create', async (req,res)=>{
    res.render('users/create', {
    });
});

//Mostrar vista con el registro solicitado
router.get('/:id', 
    validatorHandler(getUserSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const user = await service.show(id)
        res.render('users/show', {
            user: user
        });
        //res.json(event)
    }
);

//Mostrar vista con el registro solicitado para EDITAR
router.get('/edit/:id', 
    validatorHandler(getUserSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const user = await service.show(id)
        res.render('users/edit', {
            user: user
        });
        //res.json(event)
    }
);

//Agregar accesorio
router.post('/', 
    validatorHandler(createUserSchema, 'body'),
    async (req,res)=>{
        const body = req.body
        const user = await service.store(body)
        res.redirect("/admin/users")
    }
);

router.post('/:id', 
    validatorHandler(updateUserSchema, 'body'),
    async (req,res)=>{
        const id = req.params.id
        const body = req.body
        const user = await service.update(id, body)
        res.redirect("/admin/users")
    }
);


router.get('/destroy/:id', 
    validatorHandler(getUserSchema, 'params'), 
    async (req,res)=>{
        const id = req.params.id
        const product = await service.destroy(id)
        res.json(product)
    }
);

//Exportar el enrutador
module.exports = router;

   
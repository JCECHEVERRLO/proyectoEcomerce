const {models} = require('../libs/sequelize')

//Funcion para listar todos los eventos
async function index(id) {
    const ShoppingCar = await models.ShoppingCar.findAll();
    const ShoppingCarbyUser = ShoppingCar.filter(x => x.idUser == id);
    //const ShoppingCar = await models.ShoppingCar.findAll();
    return ShoppingCarbyUser;
}

//Funcion para crear un nuevo evento
async function store(body) {
    const ShoppingCar = await models.ShoppingCar.create(body);
    return ShoppingCar;
}

//Funcion para mostrar un evento
async function show(id) {
    const ShoppingCar = await models.ShoppingCar.findByPk(id);
    return ShoppingCar;
}


//Funcion para eliminar un evento
async function destroy(id) {
    const ShoppingCar = await models.ShoppingCar.findByPk(id);
    const deletedProduct = await models.ShoppingCar.destroy({
        where: {
            id
        },
        returning: true
    });
    if(deletedProduct){
        return ShoppingCar;
    }
    return null;
}

//Exportar las funciones del controlador
module.exports = {
    index,
    store,
    show,
    destroy
}
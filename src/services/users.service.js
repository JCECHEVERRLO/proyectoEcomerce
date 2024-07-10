const {models} = require('../libs/sequelize')

//Funcion para listar todos los eventos
async function index() {
    const users = await models.user.findAll();
    return users;
}

//Funcion para crear un nuevo evento

async function store(body) {
    const user = await models.user.create(body);
    return user;
}

//Funcion para mostrar un evento
async function show(id) {
    const user = await models.user.findByPk(id);
    return user;
}



//Funcion para actualizar un evento
async function update(id, body) {
    const [affectedRows, [updatedProduct]] = await models.user.update(body, {
        where: {
            id
        },
        returning: true
    });
    return updatedProduct;
}

//Funcion para eliminar un evento
async function destroy(id) {
    const user = await models.user.findByPk(id);
    const deletedProduct = await models.user.destroy({
        where: {
            id
        },
        returning: true
    });
    if(deletedProduct){
        return user;
    }
    return null;
}

//Exportar las funciones del controlador
module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
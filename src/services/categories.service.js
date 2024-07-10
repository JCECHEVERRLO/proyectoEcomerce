const {models} = require('../libs/sequelize')

//Funcion para listar todos los eventos
async function index() {
    const categories = await models.category.findAll();
    return categories;
}

//Funcion para crear un nuevo evento
async function store(body) {
    const category = await models.category.create(body);
    return category;
}

//Funcion para mostrar un evento
async function show(id) {
    const category = await models.category.findByPk(id);
    return category;
}

//Funcion para actualizar un evento
async function update(id, body) {
    const [affectedRows, [updatedProduct]] = await models.category.update(body, {
        where: {
            id
        },
        returning: true
    });
    return updatedProduct;
}

//Funcion para eliminar un evento
async function destroy(id) {
    const category = await models.category.findByPk(id);
    const deletedProduct = await models.category.destroy({
        where: {
            id
        },
        returning: true
    });
    if(deletedProduct){
        return category;
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
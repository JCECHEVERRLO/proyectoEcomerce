const {models} = require('../libs/sequelize')
const {Op} = require('sequelize')
//Funcion para listar todos los eventos
async function index() {
    const products = await models.product.findAll();
    return products;
}



//Funcion para crear un nuevo evento
async function store(body) {
    const product = await models.product.create(body);
    return product;
}

//Funcion para mostrar un evento
async function show(id) {
    const product = await models.product.findByPk(id);
    return product;
}

async function filter(name) {
    const product = await models.product.findAll({
        where: {
            name:{
                [Op.like]: `%${name}%` 
            }
            
        },
        returning: true
    });
    return product;
}

//Funcion para actualizar un evento
async function update(id, body) {
    const [affectedRows, [updatedProduct]] = await models.product.update(body, {
        where: {
            id
        },
        returning: true
    });
    return updatedProduct;
}

//Funcion para eliminar un evento
async function destroy(id) {
    const product = await models.product.findByPk(id);
    const deletedProduct = await models.product.destroy({
        where: {
            id
        },
        returning: true
    });
    if(deletedProduct){
        return product;
    }
    return null;
}

//Exportar las funciones del controlador
module.exports = {
    index,
    store,
    show,
    update,
    destroy,
    filter
}
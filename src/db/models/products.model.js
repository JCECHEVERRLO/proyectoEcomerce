const { DataTypes } = require('sequelize');

function defineProduct( sequelize ) {
    sequelize.define('product', {
        //Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DOUBLE
        },
        brand: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        stock: {
            type: DataTypes.INTEGER
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        //Other model options go here
        timestamps: false
    });
}

module.exports = defineProduct;
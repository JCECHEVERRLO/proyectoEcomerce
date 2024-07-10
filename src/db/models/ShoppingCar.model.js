const { DataTypes } = require('sequelize');

function defineShoppingCar( sequelize ) {
    sequelize.define('ShoppingCar', {
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
        quantity: {
            type: DataTypes.INTEGER
        },
        idUser:{
            type: DataTypes.INTEGER
        }
    }, {
        //Other model options go here
        timestamps: false
    });
}

module.exports = defineShoppingCar;
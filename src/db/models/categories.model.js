const { DataTypes } = require('sequelize');

function defineCategory( sequelize ) {
    sequelize.define('category', {
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
    }, {
        //Other model options go here
        timestamps: false
    });
}

module.exports = defineCategory;
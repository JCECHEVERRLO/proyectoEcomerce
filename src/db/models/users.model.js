const { DataTypes } = require('sequelize');

function defineUser( sequelize ) {
    sequelize.define('user', {
        //Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.SMALLINT
        }
    }, {
        //Other model options go here
        timestamps: false
    });
}

module.exports = defineUser;
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Specialty = sequelize.define('Specialty', {
        name: DataTypes.STRING
    }, {});
    Specialty.associate = function(models) {
    };
    return Specialty;
};
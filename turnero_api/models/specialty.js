'use strict';
module.exports = (sequelize, DataTypes) => {
    const Specialty = sequelize.define('Specialty', {
        name: DataTypes.STRING
    }, {});
    Specialty.associate = function(models) {
    	Specialty.hasMany(models.Doctor, {foreignKey: 'specialty_id', as: 'doctors'});
    };
    return Specialty;
};
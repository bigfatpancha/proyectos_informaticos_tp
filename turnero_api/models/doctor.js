'use strict';
module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        usename: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        specialty_id: DataTypes.INTEGER,
        enrollment: DataTypes.STRING,
    }, {});
    Doctor.associate = function(models) {
        Doctor.belongsTo(models.Specialty, {foreignKey: 'specialty_id', targetKey: 'id'});
    };
    return Doctor;
};
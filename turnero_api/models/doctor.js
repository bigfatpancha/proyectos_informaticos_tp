'use strict';
module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        specialty_id: DataTypes.INTEGER,
        enrollment: DataTypes.STRING,
    }, {});
    Doctor.associate = function(models) {
    };
    return Doctor;
};
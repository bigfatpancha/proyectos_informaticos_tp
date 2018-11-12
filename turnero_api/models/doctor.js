'use strict';
module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        specialty_id: DataTypes.INTEGER,
        enrollment: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {});
    Doctor.associate = function(models) {
        Doctor.belongsTo(models.Specialty, {foreignKey: 'specialty_id', as: 'specialty'});
        Doctor.belongsTo(models.User, {foreignKey: 'user_id', as: 'personal_data'});
        Doctor.hasMany(models.WorkingHours, {foreignKey: 'doctor_id', as: 'working_hours'});
        Doctor.hasMany(models.Appointment, {foreignKey: 'doctor_id', as: 'appointments'});
    };

    return Doctor;
};
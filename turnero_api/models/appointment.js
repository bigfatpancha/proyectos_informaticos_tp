'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            primaryKey: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Activo', 'Cancelado', 'Finalizado']]
            }
        }
    }, {});
    Appointment.associate = function(models) {
        Appointment.belongsTo(models.User, {foreignKey: 'user_id', as: 'patient'});
        Appointment.belongsTo(models.Doctor, {foreignKey: 'doctor_id', as: 'doctor'});
    };

    return Appointment;
};
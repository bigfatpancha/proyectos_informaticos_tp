'use strict';
module.exports = (sequelize, DataTypes) => {
    const WorkingHours = sequelize.define('WorkingHours', {
        doctor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        day_of_week: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']]
            },
            primaryKey: true
        },
        from_hour: DataTypes.INTEGER,
        to_hour: DataTypes.INTEGER,
        appointment_duration: {
            type: DataTypes.INTEGER,
            validate: {
                isIn: [[15, 30]]
            }
        }
    }, {});
    WorkingHours.associate = function(models) {
        WorkingHours.belongsTo(models.Doctor, {foreignKey: 'doctor_id', as: 'doctor'});
    };

    return WorkingHours;
};
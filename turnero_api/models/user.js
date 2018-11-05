'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    original_password: {
      type: DataTypes.VIRTUAL,
      validate: {
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { },
      }
    }
  });
  User.associate = function(models) {
    User.hasOne(models.Doctor, {foreignKey: 'user_id', as: 'doctorData'});
  };
  return User;
};
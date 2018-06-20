'use strict';

function encryptPassword(password) {
  return password.split("").reverse().join("");
}

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,      
      validate: {
        notIn: [['password', 'drowssap']]
      },
      set: function(newPassword) {
        return this.setDataValue('password', encryptPassword(newPassword));
      },
      get: function() {
        return '';
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task);
  };

  User.prototype.isValidPassword = function (password) {
    return this.getDataValue('password') === encryptPassword(password);
  };

  return User;
};
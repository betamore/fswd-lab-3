'use strict';

var crypto = require('crypto');

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
    },
    key: {
      type: DataTypes.STRING
    }
  }, {
    scopes: {
      verified: {
        where: {
          key: null
        }
      },
      notVerified: {
        where: {
          key: {
            $ne: null
          }
        }
      }
    },
    hooks: {
      beforeCreate: function(user) {
        user.key = crypto.randomBytes(32).toString('hex');
      },
      afterCreate: function(user) {
        console.log('Created user key: ' + user.key);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task);
  };

  User.prototype.isValidPassword = function (password) {
    return this.getDataValue('password') === encryptPassword(password);
  };

  User.prototype.isValidKey = function(key) {
    return this.key === key;
  };

  User.prototype.markVerified = function() {
    return this.update({ key: null });
  };

  return User;
};
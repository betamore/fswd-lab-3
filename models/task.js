'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    completedAt: DataTypes.DATE
  }, {
    scopes: {
      complete: {
        where: {
          completedAt: {
            $ne: null
          }
        }
      },
      incomplete: {
        where: {
          completedAt: null
        }
      },
      completedToday: function() {
        return {
          where: {
            completedAt: {
              $gt: (new Date()) - (24 * 60 * 60 * 1000)
            }
          }
        };
      },
      completedInLastXDays: function(x) {
        return {
          where: {
            completedAt: {
              $gt: (new Date()) - (x * 24 * 60 * 60 * 1000)
            }
          }
        };
      },
      byUser: function(userId) {
        return {
          where: {
            UserId: userId
          }
        };
      }
    }
  });

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User);
  };

  Task.prototype.isComplete = function() {
    return !!this.completedAt;
  };

  Task.prototype.markComplete = function() {
    return this.update({ completedAt: new Date() });
  }

  return Task;
};
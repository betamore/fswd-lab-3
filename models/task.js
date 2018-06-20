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
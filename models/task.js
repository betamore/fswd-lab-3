'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    name: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    completedAt: DataTypes.DATE
  }, {
    scopes: {
        completed: {
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
        last7Days: function() {
            return {
                where: {
                    completedAt: {
                        $lt: (new Date()) - (7 * 24 * 60 * 60 * 1000)
                    }
                }
            };
        },
        lastXDays: function(x) {
            return {
                where: {
                    completedAt: {
                        $lt: (new Date()) - (x * 24 * 60 * 60 * 1000)
                    }
                }
            };
        }
    }
  });

  Task.findLastXDays = function(x) {
      return Task.scope({ method: ['lastXDays', x]}).findAll();
  }

  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };

  Task.prototype.markCompleted = function() {
      return this.update({ completedAt: new Date() });
  };

  Task.prototype.isCompleted = function() {
      return !!this.completedAt;
  };

  return Task;
};

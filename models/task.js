'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    name: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
            notEmpty: true
        }
    }
  });
  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };
  return Task;
};

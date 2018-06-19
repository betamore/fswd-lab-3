'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tasks', 'completedAt', Sequelize.DATE);
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Tasks', 'completedAt');
  }
};

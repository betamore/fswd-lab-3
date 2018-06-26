'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Tasks', 'UserId', Sequelize.INTEGER);
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Tasks', 'UserId');
  }
};

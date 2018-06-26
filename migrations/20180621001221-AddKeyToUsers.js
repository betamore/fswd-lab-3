'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'key', Sequelize.STRING);
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Users', 'key');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'email', Sequelize.STRING);
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Users', 'email');
  }
};

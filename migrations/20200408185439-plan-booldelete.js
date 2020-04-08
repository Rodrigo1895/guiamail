'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("plans", 'deactivated', {
      type: Sequelize.DataTypes.BOOLEAN
    });
  },

  down: (queryInterface, Sequelize) => {

  }
};
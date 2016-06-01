'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return [
      queryInterface.addColumn(
      "Houses",
      "photo",
      Sequelize.STRING
    ),

      queryInterface.addColumn(
      "Houses",
      "price",
      Sequelize.INTEGER
    ),

      queryInterface.addColumn(
      "Houses",
      "mortgage",
      Sequelize.INTEGER
    ),

      queryInterface.addColumn(
      "Houses",
      "tax",
      Sequelize.INTEGER
      ),

      queryInterface.addColumn(
      "Houses",
      "insurance",
      Sequelize.INTEGER
      ),

      queryInterface.addColumn(
      "Houses",
      "rent",
      Sequelize.INTEGER
      )
];









  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

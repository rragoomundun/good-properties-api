'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('offers', 'city_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.removeColumn('offers', 'city');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('offers', 'city_id');

    await queryInterface.addColumn('offers', 'city', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};

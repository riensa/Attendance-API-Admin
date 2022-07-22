'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.sequelize.query("UPDATE admins SET password = '" + bcrypt.hashSync('password_1', 8) + "' WHERE id = 1;")
    await queryInterface.sequelize.query("UPDATE admins SET password = '" + bcrypt.hashSync('password_2', 8) + "' WHERE id = 2;")
    await queryInterface.sequelize.query("UPDATE admins SET password = '" + bcrypt.hashSync('password_3', 8) + "' WHERE id = 3;")
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.sequelize.query("UPDATE admins SET password = ' ' WHERE id = 1;")
     await queryInterface.sequelize.query("UPDATE admins SET password = ' ' WHERE id = 2;")
     await queryInterface.sequelize.query("UPDATE admins SET password = ' ' WHERE id = 3;")
  }
};

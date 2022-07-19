'use strict';

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

     await queryInterface.bulkInsert('admins', [{
      username: 'admin1',
      fullname: 'Admin 1',
      status: 'active',
      createdAt: '2022-07-19 07:30:00',
      updatedAt: '2022-07-19 07:30:00'
    }, {
      username: 'admin2',
      fullname: 'Admin 2',
      status: 'active',
      createdAt: '2022-07-19 07:30:00',
      updatedAt: '2022-07-19 07:30:00'
    }, {
      username: 'admin3',
      fullname: 'Admin 3',
      status: 'active',
      createdAt: '2022-07-19 07:30:00',
      updatedAt: '2022-07-19 07:30:00'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('admins', null, {});
  }
};

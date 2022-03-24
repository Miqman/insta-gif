'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = [
      { name: 'animal', PostId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'views', PostId: 1, createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('Categories', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Categories', null, {})
  }
};

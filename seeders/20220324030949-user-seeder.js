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
     { username: 'miqman', email: 'miku@gmail.com', password: 'freedom', role: 'user', createdAt: new Date(), updatedAt: new Date() },
     { username: 'admin1', email: 'admin@gmail.com', password: '123321', role: 'admin', createdAt: new Date(), updatedAt: new Date() }
   ]
   return queryInterface.bulkInsert('Users', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {})
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Bookings', [

      {
        spotId: 1,
        userId: 1,
        startDate: new Date ("2022-05-01"),
        endDate: new Date ("2022-06-01")
      },

      {
        spotId: 2,
        userId: 2,
        startDate: new Date ("2022-04-01"),
        endDate: new Date ("2022-05-01")
      },

      {
        spotId: 3,
        userId: 3,
        startDate: new Date ("2022-03-01"),
        endDate: new Date ("2022-04-01")
      }

    ]);
  },

  async down(queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Bookings', null, {});
}
};

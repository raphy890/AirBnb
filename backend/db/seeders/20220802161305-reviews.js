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
     await queryInterface.bulkInsert('Reviews', [

      //User 1 Review Info
      {
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        },

      //User 2 Review Info
      {
        "userId": 2,
        "spotId": 2,
        "review": "This spot was dope!",
        "stars": 4,
        },

      //User 3 Review Info
        {
          "userId": 3,
          "spotId": 3,
          "review": "A really nice spot!",
          "stars": 3,
          },


       ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};

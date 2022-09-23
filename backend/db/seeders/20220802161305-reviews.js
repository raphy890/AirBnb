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
    await queryInterface.bulkInsert('Reviews', [

      //User 1 Review Info
      {
        "userId": 2,
        "spotId": 1,
        "review": "Great stay! Be sure to get code before you get there.",
        "stars": 5,
      },

      //User 2 Review Info
      {
        "userId": 3,
        "spotId": 2,
        "review": "We really appreciate the stay and we will be back!",
        "stars": 4,
      },

      //User 3 Review Info
      {
        "userId": 1,
        "spotId": 3,
        "review": "We really enjoyed, clean with nice furnishings and finishes!",
        "stars": 3,
      },

      //User 4 Review Info
      {
        "userId": 5,
        "spotId": 4,
        "review": "It is a great place to stay. The house is clean and user friendly.",
        "stars": 4,
      },

      //User 5 Review Info
      {
        "userId": 4,
        "spotId": 5,
        "review": "Beautiful please, clean, super comfortable. we definitely want to come back.",
        "stars": 3,
      },

      //User 6 Review Info
      {
        "userId": 7,
        "spotId": 6,
        "review": "This place was the cutest! Very cozy and welcoming!",
        "stars": 4,
      },

      //User 7 Review Info
      {
        "userId": 6,
        "spotId": 7,
        "review": "Excellent location!",
        "stars": 3,
      },

      //User 8 Review Info
      {
        "userId": 10,
        "spotId": 8,
        "review": "A little piece of heaven off the beaten path.",
        "stars": 5,
      },

      //User 9 Review Info
      {
        "userId": 8,
        "spotId": 9,
        "review": "Super nice and relaxing.",
        "stars": 4,
      },

      //User 10 Review Info
      {
        "userId": 9,
        "spotId": 10,
        "review": "This little gem is worth a visit!!",
        "stars": 3,
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};

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
        "review": "Great stay! Be sure to get code before you get there. Trash can is a little walk to get to, but totally doable. Very comfy and pleasant stay overall! The place is very welcoming.",
        "stars": 5,
      },

      //User 2 Review Info
      {
        "userId": 3,
        "spotId": 2,
        "review": "We really appreciate the stay and we will be back! It was nice being close to the marina and pool as well as seeing some deers during our stay! Amazing view too!",
        "stars": 4,
      },

      //User 3 Review Info
      {
        "userId": 1,
        "spotId": 3,
        "review": "We really enjoyed, clean with nice furnishings and finishes, have stayed in this hosts other property in the past - she is an excellent host.",
        "stars": 3,
      },

      //User 4 Review Info
      {
        "userId": 5,
        "spotId": 4,
        "review": "It is a great place to stay. The house is clean and user friendly. Communications was great and our family enjoyed our stay here so much. The lake was a little low but that is not controllable. The marina is in walking distance to rent boats or jet skis.",
        "stars": 4,
      },

      //User 5 Review Info
      {
        "userId": 4,
        "spotId": 5,
        "review": "Beautiful please, clean, super comfortable. we definitely want to come back. Nadia was always available for us all the time and was very kind.",
        "stars": 3,
      },

      //User 6 Review Info
      {
        "userId": 7,
        "spotId": 6,
        "review": "This place was the cutest! Very cozy and welcoming. Close to downtown but you still feel like you’re in the country! 10/10!",
        "stars": 4,
      },

      //User 7 Review Info
      {
        "userId": 6,
        "spotId": 7,
        "review": "Excellent location if you are looking for some quiet time yet close enough for a trip to town and other activities.",
        "stars": 3,
      },

      //User 8 Review Info
      {
        "userId": 10,
        "spotId": 8,
        "review": "A little piece of heaven off the beaten path. Loved our stay here! 10/10 would recommend.",
        "stars": 5,
      },

      //User 9 Review Info
      {
        "userId": 8,
        "spotId": 9,
        "review": "Super nice and relaxing. Perfect place to get away and have some peace. Super clean, perfect sleep, great place on porch to enjoy coffee and wine.",
        "stars": 4,
      },

      //User 10 Review Info
      {
        "userId": 9,
        "spotId": 10,
        "review": "This little gem is worth a visit!! My husband our 14 year old son and I stayed for a few days. The entire home is very welcoming and cozy.",
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

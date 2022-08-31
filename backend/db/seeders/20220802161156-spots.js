'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Spots', [


      {
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Glorious Homes",
      description: "Place where web developers are created",
      price: 123
        },

      {
        ownerId: 2,
        address: "124 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645351,
        lng: -122.4730321,
        name: "Land of Times",
        description: "Place where web developers are created",
        price: 123
        },

       {

        ownerId: 3,
        address: "125 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Endless Green",
        description: "Place where web developers are created",
        price: 123,

       },


      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
     await queryInterface.bulkDelete('Spots', null, {});
  }
};

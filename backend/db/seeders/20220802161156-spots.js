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
      id: 1,
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123
        },

      {
        id: 2,
        ownerId: 2,
        address: "124 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645351,
        lng: -122.4730321,
        name: "Ap Academy",
        description: "Place where web developers are created",
        price: 123
        },

       {
        id: 3,
        ownerId: 3,
        address: "125 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "A Academy",
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

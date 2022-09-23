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
      address: "101 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Glorious Homes",
      description: "Rest easy among the surrounding trees. And, when you wake up, get ready for... AMAZING VIEWS",
      price: 101
      },

      {
        ownerId: 2,
        address: "102 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645351,
        lng: -122.4730321,
        name: "Land of Times",
        description: "Soak up the sun and unwind in the Zion A-Frame.",
        price: 102
        },

       {
        ownerId: 3,
        address: "103 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Endless Green",
        description: "Stay on the flank of Sleeping Ute Mountain in historic McElmo Canyon!",
        price: 103,
       },

       {
        ownerId: 4,
        address: "104 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Gulf Beach Home",
        description: "Amazing views, blissful sunsets, ocean breezes, and the sound of waves!",
        price: 104,
       },

       {
        ownerId: 5,
        address: "105 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Architectural Masterpiece",
        description: "WE GUARANTEE THIS WILL BE THE MOST AMAZING AIRBNB EVER! ",
        price: 105,
       },

       {
        ownerId: 6,
        address: "106 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Tree House",
        description: "Huge windows offering a view of the pond and gardens. The privacy fence allows total seclusion.",
        price: 106,
       },

       {
        ownerId: 7,
        address: "107 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Off-grid Desert Retreat",
        description: "Casa Rosada sits atop the western most hills of a gently rolling landscape east of Temecula.",
        price: 107,
       },

       {
        ownerId: 8,
        address: "108 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "The Glass House",
        description: "Experience the outdoors like never before.",
        price: 108,
       },

       {
        ownerId: 9,
        address: "109 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Tiny home",
        description: "Feel the mountain breeze in this air inspired rustic A-Frame.",
        price: 109,
       },

       {
        ownerId: 10,
        address: "110 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645352,
        lng: -122.4730322,
        name: "Cabin on Lake Nichols",
        description: "This fully renovated farmhouse features its original beadboard.",
        price: 110,
       }

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

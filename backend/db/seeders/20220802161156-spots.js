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
      description: "Are you sleeping among the clouds? Almost! The main bed has a memory foam mattress and is encircled by what seems like endless windows. Rest easy among the surrounding trees. And, when you wake up, get ready for... AMAZING VIEWS",
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
        description: "Soak up the sun and unwind in the Zion A-Frame. The unique convertible door lets the indoor comforts of this cozy cabin blend seamlessly with the stunning nature of the South Zion Mountains. The A-Frame living space is expansive - an open air concept to reconnect human and nature, allowing you to enjoy the natural world around you.",
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
        description: "Stay on the flank of Sleeping Ute Mountain in historic McElmo Canyon just 40 minutes from Mesa Verde and 20 minutes from the town of Cortez. The Cliff House is built right into the red rock cliff wall of a private red rock canyon alcove with comfortable amenities, internet, nearby petroglyphs and sweeping views down canyon. A perfect place to base yourself for your next creative endeavor or for exploring in the wilds of the four corners.",
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
        description: "Amazing views, blissful sunsets, ocean breezes, and the sound of waves lapping at the shoreline await you at this fabulous, recently-built, pet-friendly, beachfront home located directly on the Gulf of Mexico.",
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
        description: "Prepare to be blown away by the exquisite architecture and views that just don't stop. WE GUARANTEE THIS WILL BE THE MOST AMAZING AIRBNB EVER! ",
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
        description: "The treehouse sits in a 400 yr old oak tree. 250 yr old beams support the structure floating 25ft in the air. Huge windows offering a view of the pond and gardens. The privacy fence allows total seclusion. A composting toilet and vintage sink inside the treehouse.",
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
        description: "Experience the outdoors like never before, cozied up in the comfiest queen-size bed under luxuriously soft bedding with nothing to do but stare at those star-filled Texas skies and each other. Sleep outside and wake to the sounds of nature or roll the bed into your tiny home getaway. Either way, you'll wake to the peace and quiet of our 72-acre ranch, relaxed and ready to experience the magic of Twisted Horns Ridge.",
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
        description: "Feel the mountain breeze in this air inspired rustic A-Frame. Atop the ridge, enjoy year-round views of the mountains from the back porch. Hike up Rhododendron Ridge Trail or cozy up by the wood stove with a book. Start a campfire or listen to the sounds of Bee Tree Creek in the hammock. Nightlife, food, coffee and breweries in Asheville or Black Mountain are 15 minutes away. It's an hour to Great Smokey Mountains National Park!",
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
        description: "njoy a comfortable retreat in a historic 1930s cabin overlooking a 350-acre private lake. This fully renovated farmhouse features its original beadboard. The historic touches, combined with all the modern amenities, make this the perfect destination for those seeking to enjoy a getaway into nature and fishing experience.",
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

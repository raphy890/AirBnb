'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Images', [

      {
        url: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_640.jpg',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 1
       },

       {
        url: 'https://cdn.pixabay.com/photo/2016/09/19/22/46/lake-1681485_640.jpg',
        previewImage: true,
        spotId: 2,
        reviewId: 2,
        userId: 2
       },

       {
        url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg',
        previewImage: true,
        spotId: 3,
        reviewId: null,
        userId: 3
       }

    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Images', null, {});
  }
};

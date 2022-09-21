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
       },

       {
        url: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        previewImage: true,
        spotId: 4,
        reviewId: null,
        userId: 4
       },

       {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        previewImage: true,
        spotId: 5,
        reviewId: null,
        userId: 5
       },

       {
        url: 'https://images.unsplash.com/photo-1563720223809-b9a3d1694e2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVybiUyMGhvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        previewImage: true,
        spotId: 6,
        reviewId: null,
        userId: 6
       },

       {
        url: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGNhYmluJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        previewImage: true,
        spotId: 7,
        reviewId: null,
        userId: 7
       },

       {
        url: 'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGNhYmluJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        previewImage: true,
        spotId: 8,
        reviewId: null,
        userId: 8
       },

       {
        url: 'https://images.unsplash.com/photo-1554114777-4039b6664977?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGxha2UlMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        previewImage: true,
        spotId: 9,
        reviewId: null,
        userId: 9
       },

       {
        url: 'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGxha2UlMjBob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        previewImage: true,
        spotId: 10,
        reviewId: null,
        userId: 10
       }

    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Images', null, {});
  }
};

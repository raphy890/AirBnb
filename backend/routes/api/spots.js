const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();



// // //GET ALL SPOTS - COMPLETE
// //Part 1
// router.get('/', async (req, res, next) => {
//   const allSpots = await Spot.findAll({
//     attributes: {
//       include: [
//         [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]  //AvgRating Column Added using sequelize functions in the stars column
//       ]
//     },
//     include: [     //Provide access to Review model from associations
//       { model: Review, attributes: [] }
//     ],
//     group: ['Spot.id'], //
//     raw: true //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
//   })

//   //Part 2 - Associate previewImage with Spots
//   //Iterate through each spot in allSpots variable
//   for (let spot of allSpots) {
//     const image = await Image.findOne({
//       attributes: ['url'],
//       where: {
//         previewImage: true,
//         spotId: spot.id
//       },
//       raw: true
//     })

//     //Determine if image contains a url link
//     if (image) { //if image exists, set the url of the image equal to the value of previewImage
//       spot.previewImage = image.url  //www.allstar1.com'
//     } else {
//       spot.previewImage = null
//     }
//   }

//   res.status(200)
//   res.json({ allSpots })
// })






// Get all Spots owned by the Current User - COMPLETE
router.get('/current', requireAuth,restoreUser, async (req, res) => {
  let userId = req.user.dataValues.id

  const allSpots = await Spot.findAll({
      attributes: {
          include: [
              [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],

          ]
      },
      include: [
          { model: User, where: { id: userId }, as: 'Owner', attributes: []},
          { model: Review, attributes: []}
      ],
      group: ['Spot.id'],
      raw: true
  })
  for (let spot of allSpots) {
      const image = await Image.findOne({
          attributes: ['url'],
          where: {
              previewImage: true,
              spotId: spot.id
          },
          raw: true
      })

      //Determine if image contains a url link
      if (image) { // if image exists, set the url of the image equal to the value of previewImage
          spot.previewImage = image.url
      } else {
          spot.previewImage = null
      }
  }
  res.status(200)
  res.json({ allSpots })
})




// //### GET DETAILS OF A SPOT FROM AN ID - COMPLETE
// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(spotId)

  //Error handler if Spot does not exists
  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const numReviews = await Review.count({
    where: { spotId: spotId }
  })

  const rating = await Review.findOne({
    attributes: [[ sequelize.fn("avg", sequelize.col('stars')), "avgStarRating" ]],
    where: { spotId: spotId },
    raw: true
  })

  const images = await Image.findAll({
    attributes: [ 'id', ['spotId', 'imageableId'], 'url' ],
    where: { spotId: spotId }
  })

  const owner = await User.findByPk(spot.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  })

  const response = spot.toJSON()

  response.numReviews = numReviews
  response.avgStarRating = rating.avgStarRating
  response.Images = images
  response.Owner = owner

  res.json(response)
})



//POST/CREATE a New Spot - COMPLETE
router.post('/', async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body //deconstruct attributes from the body
  // const { address, city, state, country, name, description, price } = req.body //deconstruct attributes from the body

  // console.log(req.body);

  const user = req.user.dataValues.id //get owner id from req object
  console.log('user:', user)


  //Create new spot with id from 'user' and the following attributes below
  const spotNew = await Spot.create({ ownerId: user, address, city, state, country, lat, lng, name, description, price });


  //If newSpot exists  display new Spot
  if (spotNew) {
    res.json(spotNew)
  }


  //Error Handler
  else {
    res.status(400)
    res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    })
  }


})




//### Edit a Spot - COMPLETE
router.put("/:spotId", async (req, res) => {
  // console.log(req.params)

  //DECONSTRUCT SPOT ID FROM THE PARAMETERS
  const { spotId } = req.params

  //DECONSTRUCT THE BODY FROM THE REQUEST
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  const spotEdit = await Spot.findByPk(spotId)

  //IF THE SPOT EXISTS, SET THE FOLLOWING PARAMETERS
  if (spotEdit) {
    spotEdit.set({ address, city, state, country, lat, lng, name, description, price })

    //SAVE THE PARAMETERS TO THE SPOT
    await spotEdit.save()
    res.json(spotEdit)
  }

  //IF SPOT DOESN'T EXIST
  else if(!spotEdit){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }


  //Error Response: Body validation error - DONE
  else {
    res.status(400)
    res.json({

      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"

      }
    })
  }
})





//Delete a Spot - COMPLETE
router.delete("/:spotId", async (req, res) => {

  const { spotId } = req.params;

  const currentSpot = await Spot.findByPk(spotId);

  //Error response: Couldn't find a Spot with the specified id
  if (!currentSpot) {

    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //SUCCESSFULLY DELETE SPOT
  await currentSpot.destroy();
  res.json({

    message: "Successfully deleted",
    statusCode: 200,

  });


});





//## Add Query Filters to Get All Spots
// Return spots filtered by query parameters.
// Combined Add Query with 'GET ALL SPOT'
router.get('/', async (req, res) => {
  //Deconstruct the Query
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

  let where = {};  //define a where object for association

  //If features exist, set equal to key value of where object
  if (minLat) { where.minLat = minLat }
  if (maxLat) { where.maxLat = maxLat }
  if (minLng) { where.minLng = minLng }
  if (maxLng) { where.maxLng = maxLng }
  if (minPrice) { where.minPrice = minPrice }
  if (maxPrice) { where.maxPrice = maxPrice }

  //Coverting both page & size from string to numbers
  page = parseInt(page);
  size = parseInt(size);

  //If Page & Size don't exist or NAN then set Default
  if (Number.isNaN(page) || !page) page = 1;
  if (Number.isNaN(size) || !size) size = 20;


  //Validation error if page and size are not within scope
  if ((page < 1 || page > 10) || (size < 1 || size > 20)) {
      res.status(400)
      res.json({
          message: "Validation Error",
          statusCode: 400,
          errors: {
              page: "Page must be greater than or equal to 1",
              size: "Size must be greater than or equal to 1"
          }
      })
  }

  //Key into request to access Page & Size
  if (req.query.page && req.query.size) {


      const allSpots = await Spot.findAll({
          where: { ...where },
          group: ['Spot.id'],
          raw: true, //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
          limit: size,
          offset: size * (page - 1),
      })

      //Part 2 - Associate previewImage with Spots
      //Iterate through each spot in allSpots variable
      //find the image & url for each spot
      for (let spot of allSpots) {
          const image = await Image.findOne({
              attributes: ['url'],
              where: {
                  previewImage: true,
                  spotId: spot.id
              },
              raw: true
          })

          //Determine if image contains a url link
          if (image) { // if image exists, set the url of the image equal to the value of previewImage
              spot.previewImage = image.url
          } else {
              spot.previewImage = null
          }
      }

      //Successful Response
      res.status(200)
      res.json({
          allSpots,
          page,
          size
      });


  } else { //Return data to return all spots if no pagination

      // IF THERE'S NO PAGINATION, Get spot all
      const allSpots = await Spot.findAll({
          attributes: {
              include: [
                //AvgRating Column Added using sequelize functions in the stars column
                  [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
              ]
          },
          //Provide access to Review model from associations
          include: [
              { model: Review, attributes: [] } //remove attributes
          ],
          group: ['Spot.id'], //group all of the spots together
          raw: true //convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
      })


      //Part 2 - Associate previewImage with Spots: Iterate through each spot in allSpots variable
      for (let spot of allSpots) {
          const image = await Image.findOne({
              attributes: ['url'],
              where: {
                  previewImage: true,
                  spotId: spot.id
              },
              raw: true
          })

          //Determine if image contains a url link: if image exists, set the url of the image equal to the value of previewImage
          if (image) {
              spot.previewImage = image.url
          } else {
              spot.previewImage = null
          }
      }

      res.status(200)
      res.json({ allSpots })
  }
})





// ****************************** Bookings *************************************************

// GET ALL BOOKINGS FOR A SPOT BASED ON SPOT ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  let { spotId } = req.params
  const currentUserId = req.user.id
  const searchSpot = await Spot.findByPk(spotId)


  const owner = await Spot.findOne({
      where: { id: spotId }
  })

  const bookings = await Booking.findAll({
      where: { spotId },
      include: [
          { model: User, attributes: ['id', 'firstName', 'lastName'] },
      ]
  })

  // THROW ERROR IF SPOT
  if (!searchSpot) {
      res.status(404)
      res.json({
          message: "Spot cannot't be found",
          statusCode: 404,
      })
  }


  if (searchSpot) {
      // Successful Response: If you ARE NOT the owner of the spot.
      if (owner.id === currentUserId) {
          res.status(200)
          res.json({ bookings })
      } else {
          // Successful Response: If you ARE the owner of the spot.
          const bookings = await Booking.findAll({
              where: { spotId },
              attributes: ['spotId', 'startDate', 'endDate']
          })
          // Successful Response
          res.status(200)
          res.json({ bookings })
      }
  }
})





// Create a Booking from a Spot based on the Spot's id - COMPLETE
router.post('/:spotId/bookings', async (req, res) => {
  const { startDate, endDate } = req.body

  const { spotId } = req.params
  const findSpot = await Spot.findByPk(spotId)


  const { user } = req
  // console.log('req:', req)
  const userId = user.dataValues.id


  const allBoookings = await Booking.findAll({
    include: [
      { model: Spot, where: { id: spotId } }
    ]
  })

  if (findSpot) {
    //* Error response: Review from the current user already exists for the Spot
    let booked;
    for (let booking of allBoookings) {
      if (booking.userId === userId) {
        booked = true
      }
    }
    if (booked) {
      res.status(403)
      res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
        }
      })
    } else if (endDate < startDate) {  //* Error Response: Body validation errors
      res.status(400)
      res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          "endDate": "endDate cannot be on or before startDate"
        }
      })
    } else {
      // Create Review
      const spotBooking = await Booking.create({
        spotId, userId, startDate, endDate
      })
      res.json(spotBooking)
    }
  } else {
    //* Error response: Couldn't find a Spot with the specified id
    res.status(404)
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
})







// ****************************** Reviews *************************************************

//Create a Review for a Spot based on the Spot's id - COMPLETE
//Challenge: Implementing the error handlers in the correct order
router.post('/:spotId/reviews', async (req, res) => {
  const { review, stars } = req.body; // { review: 'This was an awesome spot!', star: undefined }
  const { user } = req   //
  // console.log(user)
  // User {
  //   dataValues: {
  //     id: 4,
  //     firstName: 'John',
  //     lastName: 'Smith',
  //     username: 'johnnysmith',
  //     email: 'john.smith@gmail.com'
  //   },
  const userId = user.dataValues.id //Id of current logged in user

  const spotId = req.params.spotId //spotId: '4'
  // console.log(spotId)
  const spot = await Spot.findByPk(spotId)



  //* Error response: Review from the current user already exists for the Spot - COMPLETE
  const allReviews = await Review.findAll({
    include: [{
      model: Spot,
      where: {
        id: spotId
      }
    }
    ]
  })


  if (spot) {
    let reviewed;
    for (let reviews of allReviews) {
      if (reviews.userId === userId) {
        reviewed = true
      }
    }
    if (reviewed) {
      res.status(403)
      res.json({
        message: "User already has a review for this spot",
        statusCode: 403
      })
    }

    //* Error Response: Body validation errors - COMPLETE
    //console.log(stars) //0
    else if (stars < 1 || stars > 5) {
      res.status(400)
      res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5",
        }
      })
    }





    //Create Review - COMPLETE
    else {
      const spotReview = await Review.create({
        userId, spotId, review, stars
      })
      res.json(spotReview)
    }
  }




  //* Error response: Couldn't find a Spot with the specified id - COMPLETE
  else {
    res.status(404)
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })

  }

})



//### Get all Reviews by a Spot's Id
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params  //id = 4
  // console.log(spotId)
  const { Image } = req.body
  // console.log()
  const spotCurrent = await Spot.findByPk(spotId);
  const reviewSpot = await Review.findAll({
    where: {
      spotId
    },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      // {model: Image, attributes: ['id', 'imageableId', 'url']}

    ],

  })
  //If review spots exists, display all reviews by Spot's ID
  if (spotCurrent) {   //IF CURRENT SPOT EXISTS
    res.status(200)
    res.json(reviewSpot)
  }

  //Error response: Couldn't find a Spot with the specified id
  else {  //IF CURRENT SPOT DOESN'T EXIST
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
})



// ****************************** Image *************************************************

//### Add an Image to a Spot based on the Spot's id - COMPLETE
router.post('/:spotId/images', restoreUser, async (req, res, next) => {

  // DECONSTRUCT SPOT ID
  const spotId = req.params = req.params.spotId;

  //DECONSTRUCT USER, URL & PREVIEW IMAGE
  const { user } = req
  const { url, previewImage } = req.body


  //IF USER DOESN'T EXIST - THROW ERROR
  if (!user) return res.status(401).json({ "message": "You need to be logged in to make any changes", "statusCode": 401 })


  //CONFIRM IF SPOT ID EXISTS
  const spot = await Spot.findByPk(spotId)


  //THROW ERROR IF SPOT COULD NOT BE FOUND
  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // CREATE AN IMAGE
  const image = await Image.create({ url, previewImage, spotId, userId: user.id})

  //DEFINE AN OBJECT IN ORDER TO MAKE THE ASSOCIATION
  const object = {}
  object.id = image.id
  object.imageableId = parseInt(spotId)
  object.url = image.url

  res.status(200).json(object)

})

module.exports = router

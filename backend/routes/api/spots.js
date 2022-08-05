const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();



// //GET ALL SPOTS - COMPLETE
//Part 1
router.get('/', async (req, res, next) => {
  const allSpots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]  //AvgRating Column Added using sequelize functions in the stars column
      ]
    },
    include: [     //Provide access to Review model from associations
      { model: Review, attributes: [] }
    ],
    group: ['Spot.id'], //
    raw: true //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
  })

  //Part 2 - Associate previewImage with Spots
  //Iterate through each spot in allSpots variable
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
    if (image) { //if image exists, set the url of the image equal to the value of previewImage
      spot.previewImage = image.url  //www.allstar1.com'
    } else {
      spot.previewImage = null
    }
  }

  res.status(200)
  res.json({ allSpots })
})






// Get all Spots owned by the Current User - COMPLETE
router.get('/current', requireAuth, async (req, res, next) => {
  //Step 1: Idenitfy the current userId  from the request
  const id = req.user.dataValues.id //4
  // console.log('req.user', req.user.dataValues.id) //4

  //Step 2: Find current user
  const currUser = await Spot.findAll({
    attributes: { include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]] },
    include: [{ model: Review, attributes: [] }],
    where: { id },
    raw: true
  })

  //Step 3: ITERATE THROUGH EACH SPOT
  for (let spot of currUser) {
    console.log('spot', spot)
    const image = await Image.findOne({
      attributes: ['url'],
      where: {
        previewImage: true,
        spotId: spot.id
      },
      raw: true
    })


    //Step 4: IF IMAGE EXISTS, SET PREVIEW IMAGE EQUAL TO THE VALUE OF THE KEY OF URL
    if (image) {
      spot.previewImage = image.url
    } else {
      spot.previewImage = null
    }

  }
  res.status(200)
  res.json({ currUser })
})




// //### GET DETAILS OF A SPOT FROM AN ID - COMPLETE
//Part 1
router.get('/:spotId', async (req, res, next) => {
  // console.log(req)
  const spotId = req.params.spotId

  const getSpots = await Spot.findByPk(spotId) //CONFIRM IF spotId EXISTS
  const reviews = await Review.count({ //DETERMINE REVIEW COUNT
    where: { spotId }
  })

  const spotDetails = await Spot.findOne({

    //Determine the key:value pair for numReviews
    attributes: {
      include: [
        [sequelize.fn("COUNT", reviews), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
      ]
    },


    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: [] },
    ],


    raw: true, //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
    where: { id: spotId }
  })


  //Part 2
  const imagesDetails = await Image.findAll({ //Set up a query for Images
    attributes: ['id', ['spotId', 'imageableId'], 'url'], //Extract attributes from Images and attach spotID ==> imageableID
    where: { spotId },
    raw: true //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
  })

  spotDetails.Images = imagesDetails

  let owner = {} //Include details of owner within spotDetails
  let user = await User.findByPk(spotId)
  let userData = user.dataValues
  owner.id = userData.id;

  // console.log(userdata)
  //id: 3,
  // firstName: 'firstuser3',
  // lastName: 'lastuser3',
  // username: 'FakeUser2'

  owner.firstName = userData.firstName
  owner.lastName = userData.lastName

  spotDetails.Owner = owner

  console.log('getSpots', getSpots)

  //ERROR HANDLER IF SPOT COULD NOT BE FOUND WITH THE SPECIFICED ID
  if (!getSpots) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  res.json(spotDetails)

})




//POST/CREATE a New Spot - COMPLETE
router.post('/', async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body //deconstruct attributes from the body
  // console.log(req.body);

  const user = req.user.dataValues.id //get owner id from req object


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



// ****************************** Bookings *************************************************

// GET ALL BOOKINGS FOR A SPOT BASED ON SPOT'S ID - UPDATE CODE**
router.get('/:spotId/bookings', async (req, res) => {
  const { startDate, endDate } = req.params

  let { spotId } = req.params // DECONSTRUCT SPOTID FROM PARAMS/URL
  const searchSpot = await Spot.findByPk(spotId)

  const { userId } = req.user.dataValues.id

  const getBookings = await Booking.findAll({ //SET GETSPOT TO VARIABLE BASED ON SPOTID WITHIN PARAMS
    include: [
      { model: Spot, where: { id: spotId } }
    ]
  })



  //IF THE SPOTID EXISTS, GET ALL BOOKINGS BASED ON SPOT ID
  if (searchSpot) {
    res.status(200)
    res.json({ getBookings })
  }


  
  //THROW ERROR IF SPOT CANNOT BE FOUND
  else {
    res.status(404)
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    })
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



//### Get all Reviews by a Spot's Id - COMPLETE
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params  //id = 4
  // console.log(spotId)
  const { Image } = req.body
  console.log()
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
  //If review spots doesn't exist, throw an error
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

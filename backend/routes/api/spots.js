const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();



//Get all Spots - COMPLETE
router.get('/', async(req,res) => {
const getSpots = await Spot.findAll({})
  res.status(200)
  return res.json(getSpots)
})



//Get Spots owned by Current User - COMPLETE
router.get('/current', async(req,res) => {
  const currentUser = req.user.dataValues.id //access current User id
  // console.log(req.user)
// console.log(currentUser) //user id
  const getCurrentSpots = await Spot.findAll({
    include: [
      {model: User,
      where: {
        id: currentUser
      }}
    ]

    })
  res.status(200)
  return res.json({getCurrentSpots})
})


//### Get details of a Spot from an Id
router.get('/:spotId', async (req,res) =>{
  // console.log(req)
  const spotId = req.params.spotId
  const spotDetails = await Spot.findByPk(spotId,{
    include: [
      {
        model: Image,
        attributes: ['id', 'url'] //missing imageableId
      },
      {model: User,
      attributes: ['id', 'firstName','lastName']
      },

    ]
  })

   res.json(spotDetails)

})





//POST/CREATE a New Spot - COMPLETE
router.post('/', async (req,res) => {
  const {address, city, state, country, lat, lng, name, description, price} = req.body //deconstruct attributes from the body
  console.log(req.body);

  const user = req.user.dataValues.id //get owner id from req object


  //Create new spot with id from 'user' and the following attributes below
  const spotNew = await Spot.create({ ownerId: user, address, city, state, country, lat, lng, name, description, price});

  if (spotNew) {
    res.json(spotNew)
  }
  else{
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
router.put("/:spotId", async (req,res) => {
  // console.log(req.params)
  const {spotId} = req.params  //deconstruct spotId/url
  const {address, city, state, country, lat, lng, name, description, price} = req.body // deconconstruct the requested body

  const spotEdit = await Spot.findByPk(spotId)

  if(spotEdit){
    spotEdit.set({address, city, state, country, lat, lng, name, description, price}) //set the following parameters

    await spotEdit.save() // save the following parameters that were set above

    res.json(spotEdit) //
  }

  else{
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



// // GET details of a Spot from an id
// router.get('/:spotId', async (req, res) => {
//   let spotId = req.params.spotId
//   const details = await Spot.findByPk(spotId, {


//   })

//   res.json({details})
// })

module.exports = router

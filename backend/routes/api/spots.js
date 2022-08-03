const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, } = require('../../db/models');
const router = express.Router();



//Get all Spots
router.get('/', async(req,res) => {
const getSpots = await Spot.findAll({})
  res.status(200)
  return res.json(getSpots)
})



//Get Spots of Current User
router.get('/current', async(req,res) => {
  const currentUser = req.user.dataValues.id //access current User id
  // console.log(req.user)
  // console.log(currentUser)
  const getSpots = await Spot.findAll({
    include : [
      {model: currentUser}
    ]


    })
  res.status(200)
  return res.json(getSpots)
})


router.post('/', async (req,res) => {
  const {address, city, state, lat, lng, name, description, price} = req.body
  const user = req.user.dataValues.id
  const spotNew = await Spot.build({
    ownerId: userId, address, city,state, country, lat, lng, name, description, price
  });
  res.json(newSpot)

})

// // GET details of a Spot from an id
// router.get('/:spotId', async (req, res) => {
//   let spotId = req.params.spotId
//   const details = await Spot.findByPk(spotId, {


//   })

//   res.json({details})
// })

module.exports = router

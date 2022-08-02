const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review } = require('../../db/models');
const router = express.Router();



//Get all Spots
router.get('/', async(req,res) => {
  const getSpots = await Spot.findAll({
      attributes: [
          'ownerId',
          'address',
          'city',
          'state',
          'country',
          'lat',
          'lng',
          'name',
          'description',
          'price'
      ]
  })
  res.status(200)
  return res.json(getSpots)
  })





module.exports = router

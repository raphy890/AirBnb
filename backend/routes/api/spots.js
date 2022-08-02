const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const router = express.Router();



//Get all Spots
router.get('/', async (req,rest) => {
const spots = await Spot.findAll({

})
return rest.json(spots)

})







module.exports = router;

const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();





//### Delete an Image
router.delete('/:imageId', requireAuth, async (req,res) =>{
  
})
























module.exports = router

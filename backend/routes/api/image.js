const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();





//### Delete an Image
router.delete('/:imageId', requireAuth, async (req,res,next) =>{

  const {id} = req.params.imageId
  const image = await Image.findByPk(id)

  if (!image) {
    res.json({
      message: "Image could not be found",
      statusCode: 404
    })
  }

  //Successfully delete Image
  if(image.userId === req.user.id){
    await image.destroy()
    res.json({
      message: "Successfully deleted!!!!!!!",
      statusCode: 200
    })
  }

})







module.exports = router

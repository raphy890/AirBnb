const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();





//### Delete an Image - COMPLETED
router.delete("/:imageId", requireAuth, restoreUser, async (req, res) => {
  const { imageId } = req.params;
  const currentImage = await Image.findByPk(imageId);


  if (!currentImage) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await currentImage.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});







module.exports = router

const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();



//### Get all Reviews of the Current User - complete
router.get('/current', requireAuth, async (req, res) => {
  // console.log(req.user)
  const currentUserId = req.user.dataValues.id // access current User id
  const getReviews = await Review.findAll({

    include: [
      { model: User, where: { id: currentUserId } },
      {
        model: Spot,
        attributes: [
          "id", "ownerId", "address", "city", "state",
          "country", "lat", "lng", "name", "price"
        ]
      },
      { model: Image, attributes: ['id', ['spotId', 'imageableId'], 'url'] }

    ]

  })

  if (getReviews) {
    res.status(200)
    return res.json({ getReviews })
  }
})



//### Edit a Review  - COMPLETE
router.put('/:reviewId', async (req, res) => {
  // console.log(req.params)
  const { reviewId } = req.params
  // console.log('reviewId', reviewId)

  const { userId, spotId, review, stars } = req.body

  const edit = await Review.findByPk(reviewId);

  //SUCCESSFULLY POST A REVEIW
  if (edit) {
    edit.set({
      review,
      stars
    })
    await edit.save()
    res.status(200)
    res.json(edit)
  }


  // THROW ERROR IF STARS DON'T ALIGN WITH VALIDATION
  else if (stars < 1 || stars > 5) {
    res.status(400)
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "review": "Review text is required",
          "stars": "Stars must be an integer from 1 to 5",
        }
      }
    });
  }

  //EDIT A Review ERROR CHECK - THROW ERROR IF SPOT COULDN'T BE FOUND
  else {
    res.status(404);
    res.json({
      errors: {
        "message": "Spot couldn't be found",
        "statusCode": 404
      }
    })
  }
})




//### Delete a Review - COMPLETE
router.delete("/:reviewId", async (req, res) => {


  const { reviewId } = req.params;
  // console.log(reviewId)
  const currentReview = await Review.findByPk(reviewId);


  //Error response: Couldn't find a Review with the specified id
  if (!currentReview) {
    res.status(404);
    return res.json({

      message: "Review couldn't be found",
      statusCode: 404,

    });
  }

  //Successfully delete review
  await currentReview.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});


//Create an Image for a Reviw
// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, restoreUser, async (req, res) => {

  // DECONSTRUCT SPOT ID
  const reviewId = req.params = req.params.reviewId;
  const { user } = req       //DECONSTRUCT USER, URL & PREVIEW IMAGE
  const { url, previewImage } = req.body
  const review = await Spot.findByPk(reviewId)   //CONFIRM IF SPOT ID EXISTS



  if (!review) {     //THROW ERROR IF SPOT COULD NOT BE FOUND
      res.status(404)
      return res.json({
          "message": "Spot couldn't be found",
          "statusCode": 404
      })
  }



  // CREATE AN IMAGE IF SPOT CAN BE FOUND
  const image = await Image.create({ url, previewImage, reviewId, userId: user.id })



  //DEFINE AN OBJECT IN ORDER TO MAKE THE ASSOCIATION
  const object = {}
  object.id = image.id
  object.imageableId = parseInt(reviewId)
  object.url = image.url

  res.status(200).json(object)
})



module.exports = router

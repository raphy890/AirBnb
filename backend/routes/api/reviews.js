const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();






//### Get all Reviews of the Current User - COMPLETED
router.get('/current', async (req,res) => {
  // console.log(req.user)
  const currentUserId = req.user.dataValues.id // access current User id
  const getReviews = await Review.findAll({

        where: {
          id: currentUserId
        },
        include: [
          { model: User, attributes: ['id', 'firstName', 'lastName']}
        ]

  })
  res.status(200)
  return res.json({getReviews})
})



//### Edit a Review  ******
router.put('/:reviewId', async (req,res) => {
  console.log(req.params)
  const reviewId = req.params
  console.log('reviewId', reviewId)

  const {userId, spotId, review, stars}= req.body

  const editReview = await Spot.findByPk(reviewId)

  if (!reviewId){
    res.status(404)
    res.json(
      {
        "message": "Review couldn't be found",
        "statusCode": 404
      }
    )
  }

  if (editReview){
    editReview.set({userId, spotId, review, stars})

    await editReview.save()

    res.status(200)
    res.json(editReview)
  }

  if (stars < 1 || stars > 5 || !review) {
    res.status(400)
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    })

  }

})








module.exports = router

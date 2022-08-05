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
  // console.log(req.params)
  const {reviewId} = req.params
  // console.log('reviewId', reviewId)

  const {userId, spotId, review, stars}= req.body

  const edit = await Review.findByPk(reviewId);

  //SUCCESSFULLY POST A REVEIW
  if(edit){
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
router.delete("/:reviewId",  async (req, res) => {


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




module.exports = router

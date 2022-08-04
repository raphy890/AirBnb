const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();






// // //### Get all Reviews of the Current User
// router.get('/current', async (req,res) => {
//   // console.log(req.user)
//   const currentUserId = req.user.dataValues.id // access current User id
//   const getReviews = await Review.findall({
//     include: [
//       {
//         model: User,
//         where: {
//           id: currentUserId
//         }
//       }
//     ]
//   })
//   res.status(200)
//   return res.json({getReviews})
// })





module.exports = router

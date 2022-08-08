const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require("sequelize");
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();




// **GET ALL CURRENT USERS'S BOOKINGS - COMPLETE
router.get('/current', requireAuth, async (req, res, next) => {

  //Deconstruct user id from the request
  let userId = req.user.dataValues.id

  const bookings = await Booking.findAll({
      where: { userId },
      include: [{model: Spot}]
  })

  //no errors required
  res.status(200)
  res.json({ bookings })
})



//EDIT BOOKING - COMPLETE
router.put('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {

  const bookingId = req.params.bookingId
  const { startDate, endDate } = req.body
  const newBooking = await Booking.findByPk(bookingId)

  if (startDate > endDate) {
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate"
      }
    })
  }

  if (!newBooking) {
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  let now = Date.now()
  let bookingdate = new Date(newBooking.endDate)

  if (now > bookingdate) {
    res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  const spotId = newBooking.spotId

  const currentBookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.and]: [
        {endDate: {[Op.gte]: startDate}},
        {startDate: {[Op.lte]: endDate}},
      ],
    },
  });

  if (currentBookings.length) {
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }

  if (newBooking.userId === req.user.id) {
    newBooking.startDate = startDate,
    newBooking.endDate = endDate,

    await newBooking.save()
    res.json(newBooking)
  }
})







//DELETE A BOOKING - COMPLETE
router.delete("/:bookingId", async (req, res) => {


  //DECONSTRUCT BOOKINGID FROM THE REQUEST
  const { bookingId } = req.params;
  // console.log(bookingId)
  const currentBooking = await Booking.findByPk(bookingId);



  //THROW ERROR IF BOOKING DOESN'T EXIST
  if (!currentBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  //Error response: Bookings that have been started can't be deleted
  let current = Date.now()
  let bookedDate = new Date(bookingId.startDate)

  if (current > bookedDate) {
    res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    })
  }

  //
  await currentBooking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });


});


module.exports = router

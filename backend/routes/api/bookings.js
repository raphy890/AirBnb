const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize, Booking } = require('../../db/models');
const { response } = require('express');
const router = express.Router();





//Edit Booking
router.put("/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;

  const editBooking = await Booking.findByPk(bookingId);

  if (editBooking) {
    const findAllBookings = await Booking.findAll({
      where: { spotId: 2 },
    });
    res.json(editBooking);

    if (
      findAllBookings.startDate === editBooking.startDate ||
      findAllBookings.endDate === editBooking.endDate ||
      findAllBookings.startDate === editBooking.endDate ||
      editBooking.endDate === editBooking.startDate
    ) {
      res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    //Error Handler: EDIT CANNOT BE BEFORE A STORE DATE
    else if (endDate < newDate) {
      res.status(400);
      res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot come before startDate",
        },
      });
    }

    // *******
    if (endDate < new Date) {
      res.status(403);
      res.json({
        message: "Past bookings can't be modified",
        statusCode: 403,
      });
    }

    if(editBooking){


    }
    editBooking.set({
      startDate,
      endDate,
    });
    await editBooking.save();
    res.json(editBooking);

  } else {
    res.status(404);
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
});




module.exports = router

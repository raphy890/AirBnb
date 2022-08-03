// backend/routes/api/index.js
const router = require('express').Router();  //Phase 1:
const sessionRouter = require('./session.js');
const spotsRouter = require('./spots'); //spots router is imported
const usersRouter = require('./users'); //user router is imported
const reviewsRouter = require ('./reviews') //review router is imported
const bookingsRouter = require('./bookings') //book router is imported
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use(restoreUser);
router.use('/bookings', bookingsRouter) // bookings router file
router.use('/reviews', reviewsRouter) //reviews router file
router.use('/session', sessionRouter); //session router file
router.use('/spots', spotsRouter)
router.use('/users', usersRouter); //user router file
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

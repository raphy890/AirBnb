// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');// Validating Login Request Body
const { handleValidationErrors } = require('../../utils/validation');
// ...




//Test

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];





// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);







// User Logout API Route:
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');//removes the token cookie from the response & return json message
    return res.json({ message: 'success' });
  }
);



//Get/Session: requires authroization while logged in
//References auth.js file  to return the user else returns an error
router.get("/", requireAuth, async (req, res) => { res.json(req.user)});












module.exports = router;

// backend/routes/index.js
const express = require('express');
const app = require('../app');
const router = express.Router();
// backend/routes/index.js
// ...

const apiRouter = require('./api')  // aka ./api/index.js  
router.use('/api', apiRouter)  //express automtically selects an 'index.js' file in the api folder


// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
// ...

module.exports = router;

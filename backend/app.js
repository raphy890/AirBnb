const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  // backend/app.js
const routes = require('./routes');

// ...


app.use(routes); // Connect all the routes



// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});


// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;



const express = require ('express');
require('express-async-errors');
const morgan = require('morgan');  //morgan - logs info about server requests/responses
const cors = require('cors');
const csurf = require('csurf'); //CSRF protection
const helmet = require('helmet'); //security middleware   https://www.npmjs.com/package/helmet
const cookieParser = require('cookie-parser') //parsing cookies from requests

/*
Create a variable called isProduction that will be true if the environment is in production or not by checking
the environment key in the configuration file (backend/config/index.js):
*/

const {environment} = require('./config.json')
const isProduction = environment === 'production'


const app = express(); //Initialize the Express application:
app.use(morgan('dev')) //Connect the morgan middleware for logging information about requests and responses:

app.use(cookieParser());//Add the cookie-parser middleware for parsing cookies
app.use(express.json()) //add the express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json".


//Step: Set up all the pre-request middleware
// Security Middleware
if(!isProduction){     //enable cors only in development
  app.use(cors());
}

/*Only allow CORS (Cross-Origin Resource Sharing) in development
using the cors middleware because the React frontend will be
served from a different server than the Express server. CORS
isn't needed in production since all of our React and Express
resources will come from the same origin.
*/


app.use(
  helmet.crossOriginResourcePolicy({ // helmet helps set a variety of headers to better secure your app
    policy: "cross-origin"
  })
);

//Enable better overall security with the helmet middleware.
//React is generally safe at mitigating XSS (i.e., Cross-Site Scripting) attacks,
//but do be sure to research how to protect your users from such attacks
//in React when deploying a large production application. Now add the
//crossOriginResourcePolicy to the helmet middleware with a policy of cross-origin.
//This will allow images with URLs to render in deployment.


app.use( // Set the _csrf token and create req.csrfToken method
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction & "Lax",
      httpOnly: true
    }
  })
)

/*
The csurf middleware will add a _csrf cookie that is HTTP-only
(can't be read by JavaScript) to any server response. It also adds a
method on all requests (req.csrfToken) that will be set to another
cookie (XSRF-TOKEN) later on. These two cookies work together to provide CSRF
(Cross-Site Request Forgery) protection for your application. The XSRF-TOKEN
cookie value needs to be sent in the header of any request with all HTTP verbs
besides GET. This header will be used to validate the _csrf cookie to confirm
that the request comes from your site and not an unauthorized site.
*/


const routes = require('./routes');
app.use(routes); // Conect all the routes


module.exports = app; //export the app





// const express = require ('express');
// require('express-async-errors');
// const morgan = require('morgan');  //morgan - logs info about server requests/responses
// const cors = require('cors');
// const csurf = require('csurf'); //CSRF protection
// const helmet = require('helmet'); //security middleware   https://www.npmjs.com/package/helmet
// const cookieParser = require('cookie-parser') //parsing cookies from requests

// /*
// Create a variable called isProduction that will be true if the environment is in production or not by checking
// the environment key in the configuration file (backend/config/index.js):
// */

// const {environment} = require('./config.json')
// const isProduction = environment === 'production'


// const app = express(); //Initialize the Express application:
// app.use(morgan('dev')) //Connect the morgan middleware for logging information about requests and responses:

// app.use(cookieParser());//Add the cookie-parser middleware for parsing cookies
// app.use(express.json()) //add the express.json middleware for parsing JSON bodies of requests with Content-Type of "application/json".


// //Step: Set up all the pre-request middleware
// // Security Middleware
// if(!isProduction){     //enable cors only in development
//   app.use(cors());
// }

// /*Only allow CORS (Cross-Origin Resource Sharing) in development
// using the cors middleware because the React frontend will be
// served from a different server than the Express server. CORS
// isn't needed in production since all of our React and Express
// resources will come from the same origin.
// */


// app.use(
//   helmet.crossOriginResourcePolicy({ // helmet helps set a variety of headers to better secure your app
//     policy: "cross-origin"
//   })
// );

// //Enable better overall security with the helmet middleware.
// //React is generally safe at mitigating XSS (i.e., Cross-Site Scripting) attacks,
// //but do be sure to research how to protect your users from such attacks
// //in React when deploying a large production application. Now add the
// //crossOriginResourcePolicy to the helmet middleware with a policy of cross-origin.
// //This will allow images with URLs to render in deployment.


// app.use( // Set the _csrf token and create req.csrfToken method
//   csurf({
//     cookie: {
//       secure: isProduction,
//       sameSite: isProduction & "Lax",
//       httpOnly: true
//     }
//   })
// )

// /*
// The csurf middleware will add a _csrf cookie that is HTTP-only
// (can't be read by JavaScript) to any server response. It also adds a
// method on all requests (req.csrfToken) that will be set to another
// cookie (XSRF-TOKEN) later on. These two cookies work together to provide CSRF
// (Cross-Site Request Forgery) protection for your application. The XSRF-TOKEN
// cookie value needs to be sent in the header of any request with all HTTP verbs
// besides GET. This header will be used to validate the _csrf cookie to confirm
// that the request comes from your site and not an unauthorized site.
// */


// const routes = require('./routes');
// app.use(routes); // Conect all the routes


// module.exports = app; //export the app

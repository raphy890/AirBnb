# CareBnb

## About CareBnb
CareBnb is a full-stack clone of the AirBnb site. A user has access to log-in, view and create/update/delete homes and leave reviews. This app was created using the folliwng:
express, node, sequelize, react and redux. 

Click here to access the app: [https://airbnb-raphael-yohannes.herokuapp.com].

## Site Information

## Technologies Used
- Sequelize
- PostgresSQL
- JavaScript
- HTML
- CSS
- Node.js
- Express.js
- React
- Redux
- Heroku

## Features

### HomePage
<img width="739" alt="Home Page" src="https://user-images.githubusercontent.com/64937695/191111212-d6d95bdc-5760-4942-aee8-bb8f79a38fb7.png">

##Details Page


## Locally
Use the following instructions to launch this site:

1. Clone this repo
2. While in the backend directory, run the command: npm install to grab dependencies required for the application 
3. In the backend directory, create a .env file and add the following variables:
  - PORT 
  - DB_FILE(location of the database)
  - JWT_SECRET
  - JWT_EXPIRES_IN
4. In the same direcotry, migrate and seed data using the following commands:
  ```js
  npx dotenv sequelize db:migrate
  npx dotenv sequelize db:seed:all
  ```
5. Run the following command in the terminal to run the backend server
  ```js
  npm start
  ```
6. Open another terminal and run the same command above within the frontend directory in order to run the frontend server. 
This will open a browser and load the application
7. You now successfully have access to the app


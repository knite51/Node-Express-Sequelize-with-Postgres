[![Build Status](https://travis-ci.org/knite51/Node-Express-Sequelize-with-Postgres.svg?branch=develop)](https://travis-ci.org/knite51/Node-Express-Sequelize-with-Postgres)
[![Coverage Status](https://coveralls.io/repos/github/knite51/Node-Express-Sequelize-with-Postgres/badge.svg?branch=develop)](https://coveralls.io/github/knite51/Node-Express-Sequelize-with-Postgres?branch=develop)
# Node-Express-Sequelize-and-Postgres
Database management

## Development
This application was developed using expressjs
Database was managed by Postgres using Sequelize as ORM 

## Installation
* Ensure node is installed on your PC.
* Start up your terminal/CMD
* Clone repository by entering the command `git clone https://github.com/knite51/Node-Express-Sequelize-with-Postgres.git` on your terminal.
* Navigate to project folder on your terminal
* Enter the command `npm install` to install application dependencies.
* Start server with command `npm run start`.
* Enter (localhost:3000) into URL in your browser 

## Testing
* Download Postman on your pc to test http verbs commands in the application


## API Documentation
The API only has four endpoints which are:
* The `/users` endpoint for saving users to the database. The endpoint works with the HTTP verbs: `POST`.
* The `/user` endpoint for getting users to the database. The endpoint works with the HTTP verbs: `GET`.
* The  `/todos` endpoint for getting all todos and adding a new todo to the database. The endpoint works with the HTTP verbs: `GET` and `POST`.
* The  `/todo/:id` endpoint for getting a single todo and updating a todo and deleting a todo to the database. The endpoint works with the HTTP verbs: `GET`, `PUT` and `DELETE`.


## Recommendation
Use POSTMAN to run application.

## Author
**Ayotunde Knite**

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import models from './server/models/index';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
const today = new Date();
const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
app.get('/', (req, res) => res.status(200).send(`You visited at localhost:3000 on ${date}`));

// add users
app.post('/users', (req, res) => {
  models.User.create({
    email: req.body.email,
  }).then((user) => {
    res.json(user);
  });
});

// get all users
app.get('/user', (req, res) => {
  models.User.findAll({}).then((user) => {
    res.json(user);
  });
});

// get all todos
app.get('/todos', (req, res) => {
  models.Todo.findAll({}).then((todos) => {
    res.json(todos);
  });
});

// get add new todos
app.post('/todos', (req, res) => {
  models.Todo.create({
    title: req.body.title,
    UserId: req.body.user_id,
  }).then((todo) => {
    res.json(todo);
  });
});

// get single todo
app.get('/todo/:id', (req, res) => {
  models.Todo.find({
    where: {
      id: req.params.id,
    },
  }).then((todo) => {
    res.json(todo);
  });
});

// update single todo
app.put('/todo/:id', (req, res) => {
  models.Todo.find({
    where: {
      id: req.params.id,
    },
  }).then((todo) => {
    if (todo) {
      todo.updateAttributes({
        title: req.body.title,
        complete: req.body.complete,
      }).then(() => {
        res.send(todo);
      });
    }
  });
});

// delete a single todo
app.delete('/todo/:id', (req, res) => {
  models.Todo.destroy({
    where: {
      id: req.params.id,
    },
  }).then((todo) => {
    res.json(todo);
  });
});

export default app;

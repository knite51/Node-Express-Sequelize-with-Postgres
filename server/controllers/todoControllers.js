
import models from '../models/';

const { Todo, User } = models;

export default{
  // get all todos
  fetchAllTodos: (req, res) => {
    Todo.findAll({ include: [{ model: User }] })
      .then((todos) => {
        if (todos.length !== 0) {
          return res.status(200).send({ todos, message: 'Retrived all todos' });
        }
        return res.status(404).json({ message: 'No todos found' });
      })
      .catch((err) => {
        res.status(404);
        throw new Error(err);
      });
  },
  // get a todo
  fetchOneTodo: (req, res) => {
    Todo.findById(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({ message: 'Todo does not exists!' });
        }
        return res.status(201).send({ todo, message: `Found todo at id ${req.params.id}` });
      })
      .catch((err) => {
        return res.status(501).send({ err, message: 'Unsuccessful! Try again.' });
      });
  },
  // Post a todo
  addNewTodo: (req, res) => {
    const TodoInfo = req.body;
    const {
      title,
      userId,
    } = TodoInfo;
    User.find({ where: { id: userId } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Nonexistent user! ' });
        }
        return Todo.create({
          title,
          userId,
        })
          .then((todo) => {
            return res.status(200).send({ todo, message: 'New Todo Created!' });
          })
          .catch((err) => {
            res.status(501).send({ err, message: 'Unknown error. Try again!' });
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  // Put a todo
  updateTodo: (req, res) => {
    const todoNewInfo = req.body;
    Todo.findById(req.params.id)
      .then((todo) => {
        if (!todo) {
          res.status(404).send({ message: `Todo with id number ${req.params.id} does not exist!` });
        }
        todo.update(todoNewInfo)
          .then((newTodo) => {
            return res.status(201).send({ newTodo, message: 'Update successful!' });
          })
          .catch((err) => {
            return res.status(501).send({ err, message: 'Update failed!' });
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  // delete a todo
  deleteTodo: (req, res) => {
    Todo.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((todo) => {
        if (todo) {
          return res.status(201).send({ todo, message: 'Successfully deleted Todo!' });
        }
        return res.status(404).send({ message: `Todo id ${req.params.id} doesnot exist` });
      })
      .catch((err) => {
        return res.status(501).send({ err, message: 'Delete unsuccessful' });
      });
  },
};


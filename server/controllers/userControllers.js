import jwt from 'jsonwebtoken';
import models from '../models/';

const PrivateKey = process.env.SECRET || 'passkey';
const { User } = models;

export default {
  // Post a User
  insertUser: (req, res) => {
    const userInfo = req.body;
    const {
      email,
      username,
      password,
    } = userInfo;
    User.findOne({
      where: {
        $or: [
          { email },
          { username },
        ],
      },
    })
      .then((userReturned) => {
        if (userReturned) {
          return res.status(409).send({ message: 'User Already Exists' });
        }
        return User.create({
          email,
          username,
          password,
        })
          .then((user) => {
            const token = jwt.sign({ id: user.id, username: user.username }, PrivateKey);
            return res.status(201).send({ user, token, message: 'Successfully created User! Kindly Copy Token to login!' });
          })
          .catch((err) => {
            throw new Error(err);
          });
      });
  },
  // Get a user
  fetchUsers: (req, res) => {
    User.findAll({})
      .then((user) => {
        if (user.length !== 0) {
          return res.status(200).send({ user, message: 'All users fetched!' });
        }
        return res.status(404).json({ message: 'No User found' });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  updateUserDetails: (req, res) => {
    const userPayload = req.body;
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'No such user exists yet!' });
        }
        user.update(userPayload)
          .then((updatedUser) => {
            res.status(200).send({ updatedUser, message: 'Update Successful!' });
          })
          .catch(err => res.status(501).send({ err, message: 'Update not Successful!' }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  deleteUser: (req, res) => {
    User.destroy({
      where: { id: req.params.id },
    })
      .then((user) => {
        if (user === 1) {
          return res.status(200).send({ message: 'User Removed' });
        }
        return res.status(404).send({ message: 'Hello Macha Such User Doesnt Exisit!' });
      })
      .catch((err) => {
        res.status(501).send({ err, message: 'Delete unsuccessful!' });
      });
  },
  fetchOneUser: (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ user, message: 'Sucessful!' });
      })
      .catch((err) => {
        res.status(501).send({ err, message: 'An error occured' });
      });
  },
  loginUser: (req, res) => {
    const { identifier, password } = req.body;
    User.find({
      where: {
        $or: [
          { email: identifier },
          { username: identifier },
        ],
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials My friend' });
        }
        if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid Password Boy' });
        }
        const token = jwt.sign({
          id: user.id,
          username: user.username,
        }, PrivateKey);
        return res.status(200).send({
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
          token,
          message: 'Login Successful! Token expires in one day.',
        });
      });
  },
  logoutUser: (req, res) => {
    res.status(200).send({ message: 'User successfully logged out!' });
  },
};



import models from '../models/';

export default {
  // Post a User
  insertUser: (req, res) => {
    const userInfo = req.body;
    const {
      email,
      username,
      password,
    } = userInfo;
    models.User.create({
      email,
      username,
      password,
    })
      .then((user) => {
        return res.status(200).send({ user, message: 'Successfully created User!' });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  // Get a user
  fetchUser: (req, res) => {
    models.User.findAll({})
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
};


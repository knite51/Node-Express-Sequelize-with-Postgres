import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;

const PrivateKey = process.env.SECRET || 'passkey';

export default {
  validateUser: (req, res, next) => {
    const token = req.headers.authorizationkey;
    if (!token) {
      return res.status(401).send({ message: 'No token provided!' });
    }
    return jwt.verify(token, PrivateKey, (error, decoded) => {
      if (error) {
        res.status(401).send({ message: 'No response!' });
      }
      req.decoded = decoded;
      next();
    });
  },
  validateAdmin: (req, res, next) => {
    User.findById(req.params.id)
      .then((user) => {
        if (user.id === 1) {
          next();
        } else {
          res.status(403).send({ message: 'User unauthorized' });
        }
      })
      .catch((err) => {
        res.send(501).send({ err, message: 'Validation failed. Try again!' });
      });
  },
};

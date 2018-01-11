import express from 'express';
import { userControllers } from '../controllers';

const router = express.Router();

router.route('/users')
  .get(userControllers.fetchUser);

router.route('/user')
  .post(userControllers.insertUser);

export default router;


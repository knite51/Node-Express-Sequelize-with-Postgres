import express from 'express';
import { userControllers } from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.route('/users')
  .get(authentication.validateUser, userControllers.fetchUsers);

router.route('/:id')
  .all(authentication.validateUser)
  .get(userControllers.fetchOneUser)
  .put(authentication.validateAdmin, userControllers.updateUserDetails)
  .delete(authentication.validateAdmin, userControllers.deleteUser);

router.route('/user')
  .post(userControllers.insertUser);

router.route('/login')
  .post(userControllers.loginUser);

export default router;


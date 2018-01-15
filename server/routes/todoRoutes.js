import express from 'express';
import { todoControllers } from '../controllers';
import { authentication } from '../middlewares';

const router = express.Router();

router.route('/todos')
  .get(authentication.validateUser, todoControllers.fetchAllTodos);

router.route('/todo')
  .post(authentication.validateUser, todoControllers.addNewTodo);

router.route('/todo/:id')
  .all(authentication.validateUser)
  .get(todoControllers.fetchOneTodo)
  .put(todoControllers.updateTodo)
  .delete(todoControllers.deleteTodo);

export default router;

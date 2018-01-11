import express from 'express';
import { todoControllers } from '../controllers';

const router = express.Router();

router.route('/todos')
  .get(todoControllers.fetchAllTodos);

router.route('/todo')
  .post(todoControllers.addNewTodo);

router.route('/todo/:id')
  .get(todoControllers.fetchOneTodo)
  .put(todoControllers.updateTodo)
  .delete(todoControllers.deleteTodo);

export default router;

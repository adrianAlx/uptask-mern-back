'use strict';

import { Router } from 'express';

import {
  createTaskRules,
  protectWithJwt,
  taskIdRules,
  updateTaskRules,
} from '../middlewares';
import { createTask, deleteTask, getTask, updateTask } from '../controllers';

const router = Router();

router.use(protectWithJwt);

router.post('/', createTaskRules(), createTask);

router
  .route('/:id')
  .get(taskIdRules(), getTask)
  .put(updateTaskRules(), updateTask)
  .delete(taskIdRules(), deleteTask);

export default router;

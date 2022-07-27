'use strict';

import { Router } from 'express';

import {
  createTaskRules,
  protectWithJwt,
  taskIdRules,
  updateTaskRules,
} from '../middlewares';
import { createTask, getTask, updateTask } from '../controllers';

const router = Router();

router.use(protectWithJwt);

router.post('/', createTaskRules(), createTask);

router
  .route('/:id')
  .get(taskIdRules(), getTask)
  .put(updateTaskRules(), updateTask);

export default router;

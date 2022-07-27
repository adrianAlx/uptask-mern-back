'use strict';

import { Router } from 'express';

import { createTaskRules, protectWithJwt, taskIdRules } from '../middlewares';
import { createTask, getTask } from '../controllers';

const router = Router();

router.use(protectWithJwt);

router.post('/', createTaskRules(), createTask);

router.route('/:id').get(taskIdRules(), getTask);

export default router;

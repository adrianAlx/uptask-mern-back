'use strict';

import { Router } from 'express';

import { createTask } from '../controllers';

import { createTaskRules, protectWithJwt } from '../middlewares';

const router = Router();

router.use(protectWithJwt);

router.post('/', createTaskRules(), createTask);

export default router;

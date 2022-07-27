'use strict';

import { Router } from 'express';

import { createProjectRules, protectWithJwt } from '../middlewares';
import { createProject } from '../controllers';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.route('/').post(createProjectRules(), createProject);

export default router;

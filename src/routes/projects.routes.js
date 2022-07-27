'use strict';

import { Router } from 'express';

import { createProjectRules, protectWithJwt } from '../middlewares';
import { createProject, getProjects } from '../controllers';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.route('/').post(createProjectRules(), createProject).get(getProjects);

export default router;

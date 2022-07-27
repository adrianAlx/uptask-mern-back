'use strict';

import { Router } from 'express';

import {
  createProjectRules,
  getProjectRules,
  protectWithJwt,
} from '../middlewares';
import { createProject, getProject, getProjects } from '../controllers';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.route('/').post(createProjectRules(), createProject).get(getProjects);

router.route('/:id').get(getProjectRules(), getProject);

export default router;

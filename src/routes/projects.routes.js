'use strict';

import { Router } from 'express';

import {
  createProjectRules,
  getProjectRules,
  protectWithJwt,
  updateProjectRules,
} from '../middlewares';
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
} from '../controllers';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.route('/').post(createProjectRules(), createProject).get(getProjects);

router
  .route('/:id')
  .get(getProjectRules(), getProject)
  .put(updateProjectRules(), updateProject);

export default router;

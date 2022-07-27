'use strict';

import { Router } from 'express';

import {
  createProjectRules,
  deleteProjectRules,
  getProjectRules,
  protectWithJwt,
  updateProjectRules,
} from '../middlewares';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../controllers';

const router = Router();

// All routes will be protected
router.use(protectWithJwt);

router.route('/').post(createProjectRules(), createProject).get(getProjects);

// router.route('/collaborators').put(getPartnerRules(), getCollaborator);

router
  .route('/:id')
  .get(getProjectRules(), getProject)
  .put(updateProjectRules(), updateProject)
  .delete(deleteProjectRules(), deleteProject);

export default router;

'use strict';

import { Router } from 'express';

import {
  addPartnerRules,
  createProjectRules,
  deleteProjectRules,
  getProjectRules,
  protectWithJwt,
  updateProjectRules,
} from '../middlewares';
import {
  addCollaborator,
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

router
  .route('/:id')
  .get(getProjectRules(), getProject)
  .put(updateProjectRules(), updateProject)
  .delete(deleteProjectRules(), deleteProject);

router.route('/collaborator/:id').post(addPartnerRules(), addCollaborator);

export default router;

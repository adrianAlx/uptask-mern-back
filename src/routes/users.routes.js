'use strict';

import { Router } from 'express';

import { checkToken } from '../middlewares';
import { confirmUser } from '../controllers';

const router = Router();

router.get('/confirm/:token', checkToken, confirmUser);

export default router;

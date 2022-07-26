'use strict';

import { Router } from 'express';

import { signUp } from '../controllers';
import { signUpRules } from '../middlewares';

const router = Router();

router.post('/signup', signUpRules(), signUp);

export default router;

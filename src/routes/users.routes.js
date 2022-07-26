'use strict';

import { Router } from 'express';

import { checkToken, genRecoveryTokenRules } from '../middlewares';
import { confirmUser, genRecoveryToken } from '../controllers';

const router = Router();

router.get('/confirm/:token', checkToken, confirmUser);

router.post('/recovery-token', genRecoveryTokenRules(), genRecoveryToken);

export default router;

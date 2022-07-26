'use strict';

import { Router } from 'express';

import {
  checkToken,
  genNewPasswordRules,
  genRecoveryTokenRules,
} from '../middlewares';
import {
  confirmUser,
  genNewPassword,
  genRecoveryToken,
  validateToken,
} from '../controllers';

const router = Router();

router.get('/confirm/:token', checkToken, confirmUser);

router.post('/recovery-token', genRecoveryTokenRules(), genRecoveryToken);

router
  .route('/password-recovery/:token')
  .get(checkToken, validateToken)
  .post(genNewPasswordRules(), genNewPassword);

export default router;

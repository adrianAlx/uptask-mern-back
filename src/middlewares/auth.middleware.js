'use strict';

import { User } from '../models';

export const checkLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const matchPass = await user?.comparePassword(password);
  if (!user || !matchPass)
    return res.status(401).json({
      msg: 'There was a problem logging in. Check your email and password or create an account.',
    });

  // Check if it's a confirmed user
  if (!user.confirmed)
    return res.status(403).json({
      msg: 'Your account has not been confirmed!',
    });

  return next();
};

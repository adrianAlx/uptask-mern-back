'use strict';

import jwt from 'jsonwebtoken';

import { User } from '../models';

import { SECRETORKEY_JWT } from './../config';

export const protectWithJwt = async (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken || !bearerToken.startsWith('Bearer'))
    return res.status(401).json({ ok: false, msg: 'Invalid token!' });

  const tokenJwt = bearerToken.split(' ')[1];
  console.log(tokenJwt);

  try {
    const { id } = jwt.verify(tokenJwt, SECRETORKEY_JWT);
    const user = await User.findById(id).select('name email confirmed');

    if (!user || !user.confirmed)
      return res.status(401).json({ msg: 'Invalid token!' });

    req.authenticatedUser = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Invalid token!' });
  }
};

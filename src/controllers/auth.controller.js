'use strict';

import { User } from '../models';
import { emailRegister, genId } from '../helpers';

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password, token: genId() });
    await newUser.save();

    // Send confirmation email
    await emailRegister({ email, name, token: newUser.token });

    res
      .status(201)
      .json({ msg: 'User successfully created, check your email.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};

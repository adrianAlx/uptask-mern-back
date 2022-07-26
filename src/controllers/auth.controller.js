'use strict';

import { User } from '../models';
import { emailRegister, genId, genJWT } from '../helpers';

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

export const signIn = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).select('email name token uid');

    // Generate JWT
    const jwt = genJWT(user.id);

    res.status(200).json({ msg: 'Successful login!', token: jwt, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};

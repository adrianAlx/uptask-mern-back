'use strict';

import { User } from './../models';
import { emailResetPassword, genId } from '../helpers';

export const confirmUser = async (req, res) => {
  const { token } = req.params;

  try {
    await User.findOneAndUpdate({ token }, { token: null, confirmed: true });

    res.status(200).json({
      ok: true,
      msg: 'Successful confirmation!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};

export const genRecoveryToken = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.confirmed)
    return res.status(401).json({ msg: 'Usuario no registrado!' });

  try {
    user.token = genId();
    await user.save();

    // Send email with token/instructions
    await emailResetPassword({ email, name: user.name, token: user.token });

    res
      .status(200)
      .json({ msg: 'Se le ha enviado un email con instrucciones.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};

export const validateToken = async (_req, res) =>
  res.status(200).json({ msg: 'Successful validation!' });

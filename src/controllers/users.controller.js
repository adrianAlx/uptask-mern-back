'use strict';

import { User } from './../models';

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
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};

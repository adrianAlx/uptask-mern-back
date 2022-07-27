'use strict';

import { Project } from '../models';

export const createProject = async (req, res) => {
  const { name, description, client, deliveryDate } = req.body;
  const { authenticatedUser } = req;

  const newProject = new Project({ name, description, client, deliveryDate });
  newProject.owner = authenticatedUser._id;

  try {
    await newProject.save();

    res.status(201).json({
      msg: 'Proyecto creado correctamente!',
      project: newProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};

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
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};

export const getProjects = async (req, res) => {
  const { authenticatedUser } = req;
  const ownProjects = { owner: authenticatedUser._id };

  try {
    const [projects, total] = await Promise.all([
      Project.find({
        $or: [
          { collaborators: { $in: authenticatedUser._id } },
          { owner: { $in: authenticatedUser._id } },
        ],
      }).select('-tasks'),
      Project.countDocuments(ownProjects),
    ]);

    res.status(200).json({ total, projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id)
    .populate('owner', 'email name')
    .populate('collaborators', 'email name')
    .populate({
      path: 'tasks',
      populate: { path: 'completedBy', select: 'name' },
    }); // populate a 1 populate

  res.status(200).json({ project });
};

'use strict';

import { Project, User } from './../models';

export const isAlreadyRegistered = async (query, collection) => {
  let model;

  const checkInCollection = () => {
    if (model)
      throw new Error(
        `The ${collection}${
          query.includes('@') ? "'s email" : ' name'
        } is already registered!`
      );
  };

  switch (collection) {
    case 'user':
      model = await User.findOne({ email: query });
      return checkInCollection();

    default:
      throw new Error('Something went wrong!');
  }
};

export const isSameUserOrPartner = async (id, collection, req) => {
  const { authenticatedUser } = req;

  const project = await Project.findById(id);
  if (!project)
    throw new Error(`${collection} ID: '${id} doesn't exist in DB!`);

  if (
    project.owner._id.toString() !== authenticatedUser._id.toString() &&
    !project.collaborators.some(
      partner => partner._id.toString() === authenticatedUser._id.toString()
    )
  )
    throw new Error('Unauthorized!');
};

const isSameUer = (model, authenticatedUser) => {
  if (model.owner._id.toString() !== authenticatedUser._id.toString())
    throw new Error('Unauthorized!');
};

export const idExistInDB = async (id, collection, req) => {
  let model;
  const { authenticatedUser } = req;

  const checkInCollection = () => {
    if (!model)
      throw new Error(`${collection} ID: '${id} doesn't exist in DB!`);
  };

  switch (collection) {
    case 'project':
      model = await Project.findById(id);
      checkInCollection();
      return isSameUer(model, authenticatedUser);

    default:
      throw new Error('Something went wrong!');
  }
};

export const isEmailRegistered = async email => {
  const user = await User.findOne({ email });
  if (!user || !user.confirmed) throw new Error('Usuario no encontrado!');
};

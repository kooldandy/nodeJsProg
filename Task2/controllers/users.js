const usersData = require('./../data/users.json');
import { ErrorMessages } from './../config/constants';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash';

const getUserById = (req, res) => {
  const id = req.params.userId;
  let user = usersData.data.find((item) => item.id === id);
  if (!user) {
    res.send({
      error: ErrorMessages.NOUSER,
    });
  }
  res.send(user);
};

const removeUserById = (req, res) => {
  const id = req.params.userId;
  let userIndex = usersData.data.findIndex((item) => item.id === id);
  if (userIndex === -1) {
    res.send({
      error: ErrorMessages.NOUSER,
    });
  }
  usersData.data[userIndex].isDeleted = true;
  res.send({
    message: ErrorMessages.USERDELETED,
  });
};

const getAllUsers = (req, res) => {
  res.send(
    usersData.data
      .filter((item) => !item.isDeleted)
      .map((item) => omit(item, ['isDeleted'])),
  );
};

const createUser = (req, res) => {
  const id = uuidv4();
  usersData.data.push({
    ...req.body,
    id,
    isDeleted: false,
  });
  res.send({
    message: ErrorMessages.USERCREATED,
    id,
  });
};

const updateUser = (req, res) => {
  const { params, body } = req;
  const id = params.userId;
  const userIndex = usersData.data.findIndex((item) => item.id === id);
  if (userIndex === -1) {
    res.send({
      error: ErrorMessages.NOUSER,
    });
  }
  const originalItem = usersData.data[userIndex];
  const updatedItem = {
    ...originalItem,
    ...body,
  };
  usersData.data[userIndex] = updatedItem;
  res.send(omit(updatedItem, ['isDeleted']));
};

const getAutoSuggestUsers = (req, res) => {
  const { loginSubstring, limit } = req.query;
  const users = usersData.data
    .filter((item) => item.login.includes(loginSubstring))
    .slice(0, limit)
    .sort((a, b) => {
      return a.login > b.login ? 1 : -1;
    });

  res.send(users);
};

module.exports = {
  getUserById,
  removeUserById,
  getAllUsers,
  createUser,
  updateUser,
  getAutoSuggestUsers,
};

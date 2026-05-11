const { v4: uuidv4 } = require('uuid');
const { getUserById } = require('../models/User');

const sessions = new Map();

const stripBearer = (token) => token.replace('Bearer ', '');

const createSession = (userId) => {
  const token = uuidv4();
  sessions.set(token, userId);
  return token;
};

const destroySession = (token) => sessions.delete(stripBearer(token));

const getCurrentUser = (authorizationHeader) => {
  if (!authorizationHeader) return null;

  const userId = sessions.get(stripBearer(authorizationHeader));
  if (!userId) return null;

  return getUserById(userId);
};

module.exports = {
  createSession,
  destroySession,
  getCurrentUser,
};
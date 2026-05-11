const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: 'demo-user-1',
    username: 'demo_fullstack',
    email: 'demo@example.com',
    password: 'password123',
    role: 'fullstack',
    experience: 'mid',
    skills: [{ skill: 'React' }, { skill: 'Node.js' }, { skill: 'GraphQL' }],
    bio: 'Demo account for trying login, profile, Redux and GraphQL skill todos.',
    createdAt: new Date().toISOString(),
  },
];

const normalizeEmail = (email) => email.trim().toLowerCase();

const publicUser = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    experience: user.experience,
    skills: user.skills,
    bio: user.bio,
    createdAt: user.createdAt,
  };
};

const getAllUsers = () => users;
const getUserById = (id) => users.find((user) => user.id === id) || null;
const getUserByEmail = (email) => users.find((user) => user.email === normalizeEmail(email)) || null;

const createUser = (input) => {
  const email = normalizeEmail(input.email);

  if (getUserByEmail(email)) {
    throw new Error('Email already registered. Please login instead.');
  }

  const user = {
    id: uuidv4(),
    username: input.username.trim(),
    email,
    password: input.password,
    role: input.role,
    experience: input.experience,
    skills: input.skills,
    bio: input.bio || '',
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
};

const addSkillToUser = (userId, skillName) => {
  const user = getUserById(userId);
  if (!user) throw new Error('User not found');

  const skill = skillName.trim();
  const alreadyExists = user.skills.some((item) => item.skill.toLowerCase() === skill.toLowerCase());

  if (alreadyExists) {
    throw new Error('This skill already exists on the profile.');
  }

  user.skills.push({ skill });
  return user;
};

const deleteUserById = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
};

module.exports = {
  addSkillToUser,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  publicUser,
};
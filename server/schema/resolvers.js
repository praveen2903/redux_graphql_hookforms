const {
  addSkillToUser,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  publicUser,
} = require('../models/User');
const {
  createSkillTodosForUser,
  createTodo,
  deleteTodo,
  deleteTodosForUser,
  getTodosByUserId,
  toggleTodo,
} = require('../models/Todo');
const { createSession, destroySession } = require('../middleware/authMiddleware');

const resolvers = {
  Query: {
    getUsers: () => getAllUsers().map(publicUser),
    getUser: (_, { id }) => publicUser(getUserById(id)),
    me: (_, __, context) => publicUser(context.currentUser),
    getSkillTodos: (_, { userId }) => getTodosByUserId(userId),
    healthCheck: () => 'GraphQL server is running',
  },
  Mutation: {
    registerUser: (_, { input }) => {
      const user = createUser(input);
      createSkillTodosForUser(user.id, user.skills);

      return {
        token: createSession(user.id),
        user: publicUser(user),
        message: 'Registration complete. You are logged in.',
      };
    },
    loginUser: (_, { input }) => {
      const user = getUserByEmail(input.email);

      if (!user || user.password !== input.password) {
        throw new Error('Invalid email or password. Try demo@example.com / password123.');
      }

      return {
        token: createSession(user.id),
        user: publicUser(user),
        message: 'Login successful.',
      };
    },
    logoutUser: (_, { token }) => destroySession(token),
    deleteUser: (_, { id }) => {
      const deleted = deleteUserById(id);
      if (!deleted) throw new Error('User not found');

      deleteTodosForUser(id);
      return true;
    },
    addSkill: (_, { input }) => publicUser(addSkillToUser(input.userId, input.skill)),
    addSkillTodo: (_, { input }) => createTodo(input),
    toggleSkillTodo: (_, { id }) => toggleTodo(id),
    deleteSkillTodo: (_, { id }) => deleteTodo(id),
  },
};

module.exports = resolvers;
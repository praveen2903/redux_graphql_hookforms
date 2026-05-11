const { v4: uuidv4 } = require('uuid');
const { getUserById } = require('./User');

let todos = [
  {
    id: 'todo-1',
    userId: 'demo-user-1',
    skill: 'React',
    title: 'Build a reusable form component with React Hook Form.',
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'todo-2',
    userId: 'demo-user-1',
    skill: 'GraphQL',
    title: 'Write a query, mutation and resolver from scratch.',
    priority: 'medium',
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

const getTodosByUserId = (userId) => todos.filter((todo) => todo.userId === userId);

const createSkillTodosForUser = (userId, skills) => {
  const starterTodos = skills.map((skill) => ({
    id: uuidv4(),
    userId,
    skill: skill.skill,
    title: `Create one focused practice task for ${skill.skill}.`,
    priority: 'medium',
    completed: false,
    createdAt: new Date().toISOString(),
  }));

  todos = [...todos, ...starterTodos];
  return starterTodos;
};

const createTodo = (input) => {
  const user = getUserById(input.userId);
  if (!user) throw new Error('User not found for this task.');

  const hasSkill = user.skills.some((skill) => skill.skill === input.skill);
  if (!hasSkill) throw new Error('Add this skill on the profile before creating tasks for it.');

  const todo = {
    id: uuidv4(),
    userId: input.userId,
    skill: input.skill,
    title: input.title.trim(),
    priority: input.priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.unshift(todo);
  return todo;
};

const toggleTodo = (id) => {
  const todo = todos.find((item) => item.id === id);
  if (!todo) throw new Error('Task not found');

  todo.completed = !todo.completed;
  return todo;
};

const deleteTodo = (id) => {
  const before = todos.length;
  todos = todos.filter((todo) => todo.id !== id);
  return before !== todos.length;
};

const deleteTodosForUser = (userId) => {
  todos = todos.filter((todo) => todo.userId !== userId);
};

module.exports = {
  createSkillTodosForUser,
  createTodo,
  deleteTodo,
  deleteTodosForUser,
  getTodosByUserId,
  toggleTodo,
};
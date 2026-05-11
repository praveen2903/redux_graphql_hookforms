const typeDefs = `#graphql
  type Skill {
    skill: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    experience: String!
    skills: [Skill!]!
    bio: String
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
    message: String!
  }

  type SkillTodo {
    id: ID!
    userId: ID!
    skill: String!
    title: String!
    priority: String!
    completed: Boolean!
    createdAt: String!
  }

  input SkillInput {
    skill: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    role: String!
    experience: String!
    skills: [SkillInput!]!
    bio: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddSkillInput {
    userId: ID!
    skill: String!
  }

  input SkillTodoInput {
    userId: ID!
    skill: String!
    title: String!
    priority: String!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    me: User
    getSkillTodos(userId: ID!): [SkillTodo!]!
    healthCheck: String!
  }

  type Mutation {
    registerUser(input: RegisterInput!): AuthPayload!
    loginUser(input: LoginInput!): AuthPayload!
    logoutUser(token: String!): Boolean!
    deleteUser(id: ID!): Boolean!
    addSkill(input: AddSkillInput!): User!
    addSkillTodo(input: SkillTodoInput!): SkillTodo!
    toggleSkillTodo(id: ID!): SkillTodo!
    deleteSkillTodo(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
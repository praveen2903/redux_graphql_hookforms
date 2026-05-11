import { gql } from '@apollo/client'

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    email
    role
    experience
    skills {
      skill
    }
    bio
    createdAt
  }
`

export const TODO_FIELDS = gql`
  fragment SkillTodoFields on SkillTodo {
    id
    userId
    skill
    title
    priority
    completed
    createdAt
  }
`

export const GET_USERS = gql`
  ${USER_FIELDS}
  query GetUsers {
    getUsers {
      ...UserFields
    }
  }
`

export const ME = gql`
  ${USER_FIELDS}
  query Me {
    me {
      ...UserFields
    }
  }
`

export const GET_SKILL_TODOS = gql`
  ${TODO_FIELDS}
  query GetSkillTodos($userId: ID!) {
    getSkillTodos(userId: $userId) {
      ...SkillTodoFields
    }
  }
`
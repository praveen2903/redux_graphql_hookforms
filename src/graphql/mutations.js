import { gql } from '@apollo/client'
import { TODO_FIELDS, USER_FIELDS } from './queries'

export const REGISTER_USER = gql`
  ${USER_FIELDS}
  mutation RegisterUser($input: RegisterInput!) {
    registerUser(input: $input) {
      token
      message
      user {
        ...UserFields
      }
    }
  }
`

export const LOGIN_USER = gql`
  ${USER_FIELDS}
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
      message
      user {
        ...UserFields
      }
    }
  }
`

export const LOGOUT_USER = gql`
  mutation LogoutUser($token: String!) {
    logoutUser(token: $token)
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`

export const ADD_SKILL = gql`
  ${USER_FIELDS}
  mutation AddSkill($input: AddSkillInput!) {
    addSkill(input: $input) {
      ...UserFields
    }
  }
`

export const ADD_SKILL_TODO = gql`
  ${TODO_FIELDS}
  mutation AddSkillTodo($input: SkillTodoInput!) {
    addSkillTodo(input: $input) {
      ...SkillTodoFields
    }
  }
`

export const TOGGLE_SKILL_TODO = gql`
  ${TODO_FIELDS}
  mutation ToggleSkillTodo($id: ID!) {
    toggleSkillTodo(id: $id) {
      ...SkillTodoFields
    }
  }
`

export const DELETE_SKILL_TODO = gql`
  mutation DeleteSkillTodo($id: ID!) {
    deleteSkillTodo(id: $id)
  }
`
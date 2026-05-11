import { z } from 'zod'

export const registrationSchema = z.object({
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username cannot exceed 20 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Use letters, numbers and underscores only' }),


  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),

  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password needs one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password needs one number' }),

  confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),


  role: z.string().min(1, { message: 'Please select a professional role' }),


  experience: z.string().min(1, { message: 'Please select your experience level' }),


  skills: z.array(
    z.object({
      skill: z.string().min(2, { message: 'Skill must be at least 2 characters' }).max(30),
    })
  ).min(1, { message: 'Please add at least one skill' }),


  bio: z.string().max(500, { message: 'Bio cannot exceed 500 characters' }).optional(),


  terms: z.boolean().refine((value) => value === true, {
          message: 'You must accept the terms and conditions',
        }),
      }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
})

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),

  password: z.string().min(1, { message: 'Password is required' }),
})

export const addSkillSchema = z.object({
  skill: z.string()
    .min(2, { message: 'Skill must be at least 2 characters' })
    .max(30, { message: 'Skill cannot exceed 30 characters' }),
})

export const skillTodoSchema = z.object({
  skill: z.string().min(1, { message: 'Choose which skill this task belongs to' }),

  title: z.string()
    .min(5, { message: 'Task title must be at least 5 characters' })
    .max(120, { message: 'Task title cannot exceed 120 characters' }),
    
  priority: z.string().min(1, { message: 'Choose a priority' }),
})
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client/react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { REGISTER_USER } from '../../graphql/mutations'
import { setCredentials } from '../../store/slices/authSlice'
import { upsertUser } from '../../store/slices/usersSlice'
import { setAuth } from '../../utils/authStorage'

import { registrationSchema } from '../../validation/schemas'
import CustomSelect from './CustomSelect'

const roles = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Fullstack Developer', value: 'fullstack' },
  { label: 'DevOps Engineer', value: 'devops' },
  { label: 'UI/UX Designer', value: 'designer' },
  { label: 'Product Manager', value: 'pm' },
]

const experienceLevels = [
  { label: 'Junior (0-2 years)', value: 'junior' },
  { label: 'Mid-level (3-5 years)', value: 'mid' },
  { label: 'Senior (5+ years)', value: 'senior' },
  { label: 'Lead/Principal', value: 'lead' },
]

const RegistrationForm = ({ onAuthenticated }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      experience: '',
      skills: [{ skill: '' }],
      bio: '',
      terms: false,
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'skills' })

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: ({ registerUser: payload }) => {
      dispatch(setCredentials(payload))
      dispatch(upsertUser(payload.user))
      setAuth(payload)

      reset()
      setMessage({ type: 'success', text: payload.message })
      onAuthenticated('profile')
    },
    onError: (error) => setMessage({ type: 'error', text: error.message }),
  })

  const onSubmit = (data) => {
    const { confirmPassword, terms, ...input } = data
    registerUser({ variables: { input } })
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <span className="eyebrow">Register</span>
        <h2>Create account</h2>
        <p>Controller is used for select inputs. useFieldArray is used for dynamic skills.</p>
      </div>

      {message && <div className={`notice notice-${message.type}`}>{message.text}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="form-stack">
        <div className="form-grid">
          <div className="field">
            <label className="field-label">Username</label>
            <input className={`input-control ${errors.username ? 'input-error' : ''}`} {...register('username')} placeholder="johndoe" />
            {errors.username && <span className="field-error">{errors.username.message}</span>}
          </div>

          <div className="field">
            <label className="field-label">Email</label>
            <input className={`input-control ${errors.email ? 'input-error' : ''}`} type="email" {...register('email')} placeholder="john@example.com" />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label className="field-label">Password</label>
            <input className={`input-control ${errors.password ? 'input-error' : ''}`} type="password" {...register('password')} placeholder="Password123" />
            {errors.password && <span className="field-error">{errors.password.message}</span>}
          </div>

          <div className="field">
            <label className="field-label">Confirm password</label>
            <input className={`input-control ${errors.confirmPassword ? 'input-error' : ''}`} type="password" {...register('confirmPassword')} placeholder="Password123" />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        <div className="form-grid">
          <CustomSelect name="role" label="Professional role" options={roles} control={control} />
          <CustomSelect name="experience" label="Experience level" options={experienceLevels} control={control} />
        </div>

        <div className="field">
          <div className="inline-heading">
            <label className="field-label">Skills</label>
            <button type="button" className="button button-soft" onClick={() => append({ skill: '' })}>Add skill</button>
          </div>

          <div className="dynamic-list">
            {fields.map((field, index) => (
              <div key={field.id} className="dynamic-row">
                <div className="dynamic-field">
                  <input className={`input-control ${errors.skills?.[index]?.skill ? 'input-error' : ''}`} {...register(`skills.${index}.skill`)} placeholder={`Skill ${index + 1}`} />
                  {errors.skills?.[index]?.skill && <span className="field-error">{errors.skills[index].skill.message}</span>}
                </div>
                {fields.length > 1 && (
                  <button type="button" className="button button-danger-light" onClick={() => remove(index)}>Remove</button>
                )}
              </div>
            ))}
          </div>

          {errors.skills?.message && <span className="field-error">{errors.skills.message}</span>}
        </div>

        <div className="field">
          <label className="field-label">Bio</label>
          <textarea className={`input-control textarea ${errors.bio ? 'input-error' : ''}`} {...register('bio')} placeholder="Tell us about yourself" />
          {errors.bio && <span className="field-error">{errors.bio.message}</span>}
        </div>

        <label className="check-row">
          <input type="checkbox" {...register('terms')} />
          <span>I agree to the terms and privacy policy.</span>
        </label>
        {errors.terms && <span className="field-error">{errors.terms.message}</span>}

        <button className="button button-primary button-full" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register and open profile'}
        </button>
      </form>
    </section>
  )
}

export default RegistrationForm
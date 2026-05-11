import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LOGIN_USER } from '../../graphql/mutations'
import { setCredentials } from '../../store/slices/authSlice'
import { upsertUser } from '../../store/slices/usersSlice'
import { loginSchema } from '../../validation/schemas'
import { setAuth } from '../../utils/authStorage'



const LoginForm = ({ onAuthenticated }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: ({ loginUser: payload }) => {
      dispatch(setCredentials(payload))
      dispatch(upsertUser(payload.user))
      setAuth(payload)

      setMessage({ type: 'success', text: payload.message })
      onAuthenticated('profile')
    },
    onError: (error) => setMessage({ type: 'error', text: error.message }),
  })

  const fillDemo = () => {
    setValue('email', 'demo@example.com', { shouldValidate: true })
    setValue('password', 'password123', { shouldValidate: true })
  }

  return (
    <section className="panel panel-accent">
      <div className="section-heading">
        <span className="eyebrow">Login</span>
        <h2>Existing user</h2>
        <p>Login creates a session token, stores it in Redux and localStorage, then opens the profile.</p>
      </div>

      {message && <div className={`notice notice-${message.type}`}>{message.text}</div>}

      <form onSubmit={handleSubmit((data) => loginUser({ variables: { input: data } }))} className="form-stack">
        <div className="field">
          <label className="field-label">Email</label>
          <input className={`input-control ${errors.email ? 'input-error' : ''}`} type="email" {...register('email')} placeholder="demo@example.com" />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>

        <div className="field">
          <label className="field-label">Password</label>
          <input className={`input-control ${errors.password ? 'input-error' : ''}`} type="password" {...register('password')} placeholder="password123" />
          {errors.password && <span className="field-error">{errors.password.message}</span>}
        </div>

        <div className="button-row">
          <button className="button button-primary" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          <button className="button button-muted" type="button" onClick={fillDemo}>Fill demo</button>
        </div>
      </form>

      <div className="demo-box">
        Demo account: <strong>demo@example.com</strong> / <strong>password123</strong>
      </div>
    </section>
  )
}

export default LoginForm
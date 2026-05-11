import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ADD_SKILL } from '../../graphql/mutations'
import { updateCurrentUser } from '../../store/slices/authSlice'
import { upsertUser } from '../../store/slices/usersSlice'
import { addSkillSchema } from '../../validation/schemas'
import { setAuth } from '../../utils/authStorage'

const AddSkillForm = ({ user }) => {

  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(addSkillSchema),
    defaultValues: { skill: '' },
  })

  const [addSkill, { loading }] = useMutation(ADD_SKILL, {
    onCompleted: ({ addSkill: updatedUser }) => {
      dispatch(updateCurrentUser(updatedUser))
      dispatch(upsertUser(updatedUser))

      // keep stored session user in sync
      setAuth((prev) => {
        if (!prev?.token) return prev
        return { ...prev, user: updatedUser }
      })

      reset()

      setMessage({ type: 'success', text: 'Skill added to profile.' })
    },
    onError: (error) => setMessage({ type: 'error', text: error.message }),
  })

  const onSubmit = (data) => {
    addSkill({ variables: { input: { userId: user.id, skill: data.skill } } })
  }

  return (
    <section className="panel compact-panel">
      <div className="section-heading">
        <span className="eyebrow">Profile skill access</span>
        <h2>Add skills</h2>
        <p>New skills appear on the profile and become selectable when adding task todos.</p>
      </div>

      {message && <div className={`notice notice-${message.type}`}>{message.text}</div>}

      <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="field-label">Skill name</label>
          <input className={`input-control ${errors.skill ? 'input-error' : ''}`} {...register('skill')} placeholder="TypeScript" />
          {errors.skill && <span className="field-error">{errors.skill.message}</span>}
        </div>
        <button className="button button-primary button-full" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add skill to profile'}</button>
      </form>
    </section>
  )
}

export default AddSkillForm
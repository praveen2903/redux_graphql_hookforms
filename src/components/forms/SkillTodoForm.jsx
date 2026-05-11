import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ADD_SKILL_TODO } from '../../graphql/mutations'
import { addSkillTodo } from '../../store/slices/skillTodosSlice'
import { skillTodoSchema } from '../../validation/schemas'
import CustomSelect from './CustomSelect'

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

const SkillTodoForm = ({ user }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)
  const skillOptions = useMemo(() => user.skills.map((skill) => ({ label: skill.skill, value: skill.skill })), [user.skills])
  const firstSkill = skillOptions[0]?.value || ''

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(skillTodoSchema),
    defaultValues: { skill: firstSkill, title: '', priority: 'medium' },
  })

  const [addTodo, { loading }] = useMutation(ADD_SKILL_TODO, {
    onCompleted: ({ addSkillTodo: todo }) => {
      dispatch(addSkillTodo(todo))
      reset({ skill: firstSkill, title: '', priority: 'medium' })
      setMessage({ type: 'success', text: 'Task added to skill todos.' })
    },
    onError: (error) => setMessage({ type: 'error', text: error.message }),
  })

  useEffect(() => {
    reset({ skill: firstSkill, title: '', priority: 'medium' })
  }, [firstSkill, reset])

  const onSubmit = (data) => {
    addTodo({ variables: { input: { userId: user.id, ...data } } })
  }

  return (
    <section className="panel compact-panel">
      <div className="section-heading">
        <span className="eyebrow">Task access</span>
        <h2>Add tasks</h2>
        <p>Tasks are connected to profile skills and managed by the skillTodos reducer.</p>
      </div>

      {message && <div className={`notice notice-${message.type}`}>{message.text}</div>}

      {skillOptions.length === 0 ? (
        <div className="empty-state">Add a profile skill first, then you can add tasks for it.</div>
      ) : (
        <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
          <CustomSelect name="skill" label="Skill" options={skillOptions} control={control} />
          <CustomSelect name="priority" label="Priority" options={priorityOptions} control={control} />

          <div className="field">
            <label className="field-label">Task title</label>
            <input className={`input-control ${errors.title ? 'input-error' : ''}`} {...register('title')} placeholder="Build one resolver test" />
            {errors.title && <span className="field-error">{errors.title.message}</span>}
          </div>

          <button className="button button-primary button-full" type="submit" disabled={loading}>{loading ? 'Adding task...' : 'Add task'}</button>
        </form>
      )}
    </section>
  )
}

export default SkillTodoForm
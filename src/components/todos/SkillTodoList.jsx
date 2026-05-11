import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client/react'
import { DELETE_SKILL_TODO, TOGGLE_SKILL_TODO } from '../../graphql/mutations'
import { removeSkillTodo, replaceSkillTodo } from '../../store/slices/skillTodosSlice'

const SkillTodoList = ({ onRefetch }) => {
  const dispatch = useDispatch()
  const { todos, loading, error } = useSelector((state) => state.skillTodos)
  const [actionError, setActionError] = useState('')

  const [toggleTodo] = useMutation(TOGGLE_SKILL_TODO, {
    onCompleted: ({ toggleSkillTodo }) => dispatch(replaceSkillTodo(toggleSkillTodo)),
    onError: (err) => setActionError(err.message),
  })

  const [deleteTodo] = useMutation(DELETE_SKILL_TODO, {
    onError: (err) => setActionError(err.message),
  })

  const handleDelete = async (id) => {
    const result = await deleteTodo({ variables: { id } })
    if (result.data?.deleteSkillTodo) dispatch(removeSkillTodo(id))
  }

  return (
    <section className="panel todo-list-panel">
      <div className="list-header">
        <div>
          <span className="eyebrow">Redux list</span>
          <h2>Skill tasks</h2>
          <p>Toggle or delete tasks. The UI updates through the skillTodos reducer.</p>
        </div>
        <button type="button" className="button button-muted" onClick={onRefetch}>Refetch</button>
      </div>

      {loading && <div className="empty-state">Loading tasks from GraphQL...</div>}
      {error && <div className="notice notice-error">{error}</div>}
      {actionError && <div className="notice notice-error">{actionError}</div>}

      {!loading && todos.length === 0 && <div className="empty-state">No tasks yet. Add one from the task form.</div>}

      <div className="todo-stack">
        {todos.map((todo) => (
          <article key={todo.id} className={`todo-item ${todo.completed ? 'is-complete' : ''}`}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo({ variables: { id: todo.id } })} />
            <div className="todo-content">
              <strong>{todo.title}</strong>
              <div className="todo-meta">
                <span>{todo.skill}</span>
                <span className={`priority priority-${todo.priority}`}>{todo.priority}</span>
              </div>
            </div>
            <button type="button" className="button button-danger-light" onClick={() => handleDelete(todo.id)}>Delete</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SkillTodoList
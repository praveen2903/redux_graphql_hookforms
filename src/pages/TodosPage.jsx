import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client/react'
import { GET_SKILL_TODOS } from '../graphql/queries'
import SkillTodoForm from '../components/forms/SkillTodoForm'
import SkillTodoList from '../components/todos/SkillTodoList'
import { setSkillTodos, setSkillTodosError, setSkillTodosLoading } from '../store/slices/skillTodosSlice'

const TodosPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error, refetch } = useQuery(GET_SKILL_TODOS, {
    variables: { userId: user?.id || '' },
    skip: !user?.id,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!user?.id) return
    if (loading) dispatch(setSkillTodosLoading(true))
    else if (error) dispatch(setSkillTodosError(error.message))
    else if (data) dispatch(setSkillTodos(data.getSkillTodos))
  }, [data, loading, error, dispatch, user?.id])

  if (!user) {
    return (
      <main className="single-page">
        <section className="panel empty-state-panel">
          <h2>Tasks are locked</h2>
          <p>Login or register first. The tasks page can add tasks only for your profile skills.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="two-column-page task-page">
      <SkillTodoForm user={user} />
      <SkillTodoList onRefetch={() => refetch()} />
    </main>
  )
}

export default TodosPage
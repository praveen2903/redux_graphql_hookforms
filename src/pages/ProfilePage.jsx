import { useSelector } from 'react-redux'
import AddSkillForm from '../components/forms/AddSkillForm'
import ProfileSummary from '../components/profile/ProfileSummary'

const ProfilePage = ({ onLogout }) => {
  const { user } = useSelector((state) => state.auth)
  const todos = useSelector((state) => state.skillTodos.todos)

  if (!user) {
    return (
      <main className="single-page">
        <section className="panel empty-state-panel">
          <h2>Profile is locked</h2>
          <p>Register or login first to open the profile page and add skills.</p>
        </section>
      </main>
    )
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <main className="profile-page">
      <ProfileSummary user={user} todoCount={todos.length} completedCount={completedCount} onLogout={onLogout} />
      <AddSkillForm user={user} />
    </main>
  )
}

export default ProfilePage
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/profile', label: 'Profile' },
  { to: '/todos', label: 'Skill Tasks' },
  { to: '/users', label: 'Users Store' },
]

const AppHeader = ({ user }) => {
  return (
    <header className="app-header">
      <div className="hero-copy">
        <span className="eyebrow">React Vite full-stack JS app</span>
        <h4>GraphQL auth, Redux reducers, profile skills and task todos.</h4>
      </div>

      <div className="session-card">
        <span className="session-label">Current session</span>
        {user ? (
          <>
            <strong>{user.username}</strong>
            <span>{user.email}</span>
          </>
        ) : (
          <span>Not logged in. Register or use the demo login.</span>
        )}
      </div>

      <nav className="tabs" aria-label="Application pages">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default AppHeader




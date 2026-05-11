const tabs = [
  { id: 'auth', label: 'Register / Login' },
  { id: 'profile', label: 'Profile' },
  { id: 'todos', label: 'Skill Tasks' },
  { id: 'users', label: 'Users Store' },
]

const AppHeader = ({ activeTab, onTabChange, user }) => {
  return (
    <header className="app-header">
      <div className="hero-copy">
        <span className="eyebrow">React Vite full-stack JS app</span>
        <h1>GraphQL auth, Redux reducers, profile skills and task todos.</h1>
        <p>
          A separated client and server setup using React Hook Form, Zod validation,
          Apollo GraphQL and Redux Toolkit.
        </p>
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
          <button
            key={tab.id}
            type="button"
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default AppHeader
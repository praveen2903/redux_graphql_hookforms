import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client/react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { LOGOUT_USER } from './graphql/mutations'
import { logout } from './store/slices/authSlice'
import { clearSkillTodos } from './store/slices/skillTodosSlice'
import AppHeader from './components/layout/AppHeader'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import TodosPage from './pages/TodosPage'
import UsersPage from './pages/UsersPage'
import RequireAuth from './routes/RequireAuth'
import DefaultRedirect from './routes/DefaultRedirect'
import { clearAuth } from './utils/authStorage'
import './styles/app.css'

const AppShell = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [logoutUser] = useMutation(LOGOUT_USER, { onError: () => {} })

  const handleLogout = () => {
    if (token) logoutUser({ variables: { token } }).catch(() => {})
    dispatch(logout())
    dispatch(clearSkillTodos())
    clearAuth()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <AppHeader user={user} />

        <Routes>
          <Route path="/" element={<DefaultRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth" element={<Navigate to="/login" replace />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage onLogout={handleLogout} />
              </RequireAuth>
            }
          />

          <Route
            path="/todos"
            element={
              <RequireAuth>
                <TodosPage />
              </RequireAuth>
            }
          />

          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="footer-bar">
          <span>Client code lives in client/src. Server code is split into schema, models and middleware.</span>
          <span>Run server: cd server && npm install && npm start</span>
        </footer>
      </div>
    </div>
  )
}

const App = () => <AppShell />

export default App




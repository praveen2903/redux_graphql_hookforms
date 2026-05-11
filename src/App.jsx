import { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { ApolloProvider, useMutation } from '@apollo/client/react'
import client from './graphql/apolloClient'
import { LOGOUT_USER } from './graphql/mutations'
import { logout } from './store/slices/authSlice'
import { clearSkillTodos } from './store/slices/skillTodosSlice'
import { store } from './store/store'
import AppHeader from './components/layout/AppHeader'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import TodosPage from './pages/TodosPage'
import UsersPage from './pages/UsersPage'
import './styles/app.css'

const AppShell = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState(user ? 'profile' : 'auth')
  const [logoutUser] = useMutation(LOGOUT_USER, { onError: () => {} })

  const handleLogout = () => {
    if (token) logoutUser({ variables: { token } }).catch(() => {})
    dispatch(logout())
    dispatch(clearSkillTodos())
    localStorage.removeItem('devportal_auth')
    setActiveTab('auth')
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <AppHeader activeTab={activeTab} onTabChange={setActiveTab} user={user} />

        {activeTab === 'auth' && <AuthPage onAuthenticated={setActiveTab} />}
        {activeTab === 'profile' && <ProfilePage onLogout={handleLogout} />}
        {activeTab === 'todos' && <TodosPage />}
        {activeTab === 'users' && <UsersPage />}

        <footer className="footer-bar">
          <span>Client code lives in client/src. Server code is split into schema, models and middleware.</span>
          <span>Run server: cd server && npm install && npm start</span>
        </footer>
      </div>
    </div>
  )
}

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <AppShell />
    </ApolloProvider>
  </Provider>
)

export default App
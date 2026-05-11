import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <main className="single-column-auth">
      <section className="panel panel-accent auth-panel">
        <LoginForm onAuthenticated={() => navigate('/profile')} />
      </section>
    </main>
  )
}

export default LoginPage


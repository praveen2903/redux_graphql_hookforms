import { useNavigate } from 'react-router-dom'
import RegistrationForm from '../components/forms/RegistrationForm'

const RegisterPage = () => {
  const navigate = useNavigate()

  return (
    <main className="single-column-auth">
      <section className="panel panel-accent auth-panel">
        <RegistrationForm onAuthenticated={() => navigate('/profile')} />
      </section>
    </main>
  )
}

export default RegisterPage


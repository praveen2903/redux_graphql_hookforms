import LoginForm from '../components/forms/LoginForm'
import RegistrationForm from '../components/forms/RegistrationForm'

const AuthPage = ({ onAuthenticated }) => {
  return (
    <main className="two-column-page">
      <RegistrationForm onAuthenticated={onAuthenticated} />
      <LoginForm onAuthenticated={onAuthenticated} />
    </main>
  )
}

export default AuthPage
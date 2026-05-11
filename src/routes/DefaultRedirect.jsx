import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const DefaultRedirect = () => {
  const { user } = useSelector((state) => state.auth)
  return <Navigate to={user ? '/profile' : '/auth'} replace />
}

export default DefaultRedirect


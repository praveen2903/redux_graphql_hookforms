import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from '@apollo/client/react'
import { GET_USERS } from '../../graphql/queries'
import { DELETE_USER } from '../../graphql/mutations'
import { removeUser, setUsers, setUsersError, setUsersLoading } from '../../store/slices/usersSlice'

const UsersList = () => {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.users)
  const { data, loading: queryLoading, error: queryError, refetch } = useQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  const [deleteUser] = useMutation(DELETE_USER, {
    onError: (err) => alert(err.message),
  })

  useEffect(() => {
    if (queryLoading) dispatch(setUsersLoading(true))
    else if (queryError) dispatch(setUsersError(queryError.message))
    else if (data) dispatch(setUsers(data.getUsers))
  }, [data, queryLoading, queryError, dispatch])

  const handleDelete = async (id) => {
    const result = await deleteUser({ variables: { id } })
    if (result.data?.deleteUser) dispatch(removeUser(id))
  }

  return (
    <section className="panel">
      <div className="list-header">
        <div>
          <span className="eyebrow">GraphQL query to Redux</span>
          <h2>Registered users</h2>
          <p>{users.length} users currently synced in the users reducer.</p>
        </div>
        <button type="button" className="button button-muted" onClick={() => refetch()}>Refetch</button>
      </div>

      {loading && <div className="empty-state">Loading users...</div>}
      {error && <div className="notice notice-error">{error}</div>}

      <div className="user-grid">
        {users.map((user) => (
          <article key={user.id} className="user-item">
            <div>
              <strong>{user.username}</strong>
              <span>{user.email}</span>
            </div>
            <div className="skill-cloud small-cloud">
              {user.skills.map((skill) => <span key={skill.skill}>{skill.skill}</span>)}
            </div>
            <div className="user-footer">
              <span>{user.role} / {user.experience}</span>
              <button type="button" className="button button-danger-light" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default UsersList
const ProfileSummary = ({ user, todoCount, completedCount, onLogout }) => {
  return (
    <section className="panel profile-panel">
      <div className="profile-topline">
        <div>
          <span className="eyebrow">Authenticated profile</span>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
        <button type="button" className="button button-dark" onClick={onLogout}>Logout</button>
      </div>

      <div className="metric-grid">
        <div className="metric-box">
          <span>Role</span>
          <strong>{user.role}</strong>
        </div>
        <div className="metric-box">
          <span>Experience</span>
          <strong>{user.experience}</strong>
        </div>
        <div className="metric-box">
          <span>Tasks</span>
          <strong>{completedCount} / {todoCount} done</strong>
        </div>
      </div>

      {user.bio && <p className="bio-box">{user.bio}</p>}

      <div className="skill-cloud">
        {user.skills.map((skill) => <span key={skill.skill}>{skill.skill}</span>)}
      </div>
    </section>
  )
}

export default ProfileSummary
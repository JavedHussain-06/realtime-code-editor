import Avatar from "react-avatar"

// eslint-disable-next-line react/prop-types
const Client = ({ username }) => {
  return (
    <div className="client">
        <Avatar name={username} size={45} round="14px" />
        <span className="userName">{username}</span>
    </div>
  )
}

export default Client
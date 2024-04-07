export default function UserCard({ user }) {
  return (
    <div>
      <div className="image">
        {"data" in user.image ? <img
          src={`data:${user.image.contentType};base64,${Buffer.from(user.image.data.data.reduce((data, byte) => data + String.fromCharCode(byte), ''), 'ascii').toString('base64')}`}
          alt={user.first_name}
        /> : <img alt={user.first_name} />}
      </div>
      <div className="info">
        <span>Nombres:</span>
        <span>{user.first_name}</span>
        <span>Apellidos:</span>
        <span>{user.last_name}</span>
        <span>Correo:</span>
        <span>{user.email}</span>
        <span>Fecha de nacimiento:</span>
        <span>{new Date(user.birthday).toLocaleDateString()}</span>
        <span>Miembro del club deportivo:</span>
        <span>{user.subscribed ? "Sí" : "No"}</span>
      </div>
    </div>
  )
}
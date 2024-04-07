export function New({ info, setNewDetails, setIsOpen }) {
  return (
    <div
      className="new"
      onClick={() => {
        setNewDetails(info)
        setIsOpen(true)
      }}
    >
      <img src={`https://lh3.google.com/u/0/d/${info.googleId}`} />
      <span className="title">{info.title}</span>
    </div>
  )
}

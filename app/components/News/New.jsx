export function New({ info, setNewDetails, setIsOpen }) {
  console.log(info)
  return (
    <div
      className="new"
      onClick={() => {
        setNewDetails(info)
        setIsOpen(true)
      }}
    >
      {Boolean(info.url) ? <img src={info.url} /> : <img src={`https://lh3.google.com/u/0/d/${info.googleId}`} />}
      <span className="title">{info.title}</span>
    </div>
  )
}

import { getTimeFromStr } from "@/helpers/CalendarEvent"
import "./EventDetails.scss"

export default function EventDetails({ event, setIsOpen, user }) {
  let others = []

  event.extendedProps.others.map((person, index) => {
    others.push(
      <div className="row" key={`person_${index}`}>
        <span className="left">{`Invitado ${index}`}</span>
        <span className="right">{person.name}</span>
      </div>
    )
  })

  let delButton = null
  if (Boolean(user)) {
    if (user.user._id === event.extendedProps.user) {
      delButton = (
        <button
          className="button dismiss"
          onClick={() => {
            setIsOpen(false)
            event.remove()
          }}
        >
          <span className="material-icons button-icon">delete</span>
          Eliminar
        </button>
      )
    }
  }

  return (
    <div className="event-details">
      <h2 className="title">{event.title}</h2>
      <div className="body">
        <div className="row">
          <span className="left">Hora de inicio</span>
          <span className="right">{event.start.toLocaleTimeString()}</span>
        </div>
        <div className="row">
          <span className="left">Hora de término</span>
          <span className="right">{event.end.toLocaleTimeString()}</span>
        </div>
        <div className="row">
          <span className="left">Responsable</span>
          <span className="right">{event.extendedProps.name}</span>
        </div>
        {others}
        <div className="row">
          <span className="left">Descripción</span>
          <span className="right">{event.extendedProps.description}</span>
        </div>
      </div>
      <div className="footer">
        {delButton}
        <button className="button dismiss" onClick={() => setIsOpen(false)}>
          <span className="material-icons button-icon">close</span>
          Cancelar
        </button>
      </div>
    </div>
  )
}
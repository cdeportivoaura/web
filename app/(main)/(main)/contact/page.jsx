"use client"

import { useState } from "react"
import { sendEmail } from "@/helpers/SendEmail"
import Modal from "@/app/components/Modal/Modal"
import "./Contact.scss"

export default function Contact() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  function handleSubmit() {
    setLoading(true)
    sendEmail(name, email, title, content)
      .then(res => {
        if (res) {
          setIsOpen(true)
          setEmail("")
          setName("")
          setTitle("")
          setContent("")
        } else {
          console.log("Error sending message")
        }
        setLoading(false)
      })
  }

  return (
    <div className="contact">
      <p style={{ marginTop: "0" }}>Si tienes alguna duda, consulta o sugerencia no dudes en escribirnos.</p>
      <div className="field">
        <span className="material-icons button-icon">mail</span>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <span className="material-icons button-icon">person</span>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <span className="material-icons button-icon">title</span>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <textarea className="textarea" type="textarea" placeholder="Contenido" value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="buttons">
        <button className="button" onClick={handleSubmit} disabled={title === "" || content === "" || name === "" || email === "" || loading}>
          <span className="material-icons button-icon">send</span>
          Enviar Mensaje
        </button>
      </div>
      <Modal isOpen={isOpen}>
        <p className="text">Hemos recibido su correo.<br />Muchas gracias por comunicarse con nosotros.</p>
        <div className="text">
          <button className="button dismiss" onClick={() => setIsOpen(false)}>
            <span className="material-icons button-icon">close</span>
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  )
}
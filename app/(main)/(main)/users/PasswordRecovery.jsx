import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { AuthContext } from "../Auth/AuthProvider"
import Modal from "../Modal/Modal"
import Logo from "../Logo/Logo"

function validateEmail(email) {
  return Boolean(String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ))
}

export function PasswordRecovery() {
  const [email, setEmail] = useState({ email: "", warning: false })
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  let navigate = useNavigate()
  let auth = useContext(AuthContext)

  function checkEmail(email) {
    setEmail({
      email: email,
      warning: !validateEmail(email)
    })
  }

  function handleSubmit() {
    setLoading(true)
    auth.passwordRecovery(email.email)
    .then(updated => {
      if (updated[0]) {
        setLoading(false)
        setOpenModal(true)
      } else {
        console.log(updated[1])
      }
    })
  }

  return (
    <div className="login">
      <motion.div
        className="content"
        initial={{ opacity: 0.2, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <Logo />
        <p className="subtitle">
          Escribe el correo asociado a la contraseña que quieres recuperar.<br />
          Te enviaremos un correo electrónico con las instrucciones para que puedas establecer una nueva contraseña.
        </p>
        <div className={(email.warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">mail</span>
          <input
            type="email"
            placeholder="Email"
            value={email.email}
            onChange={(e) => checkEmail(e.target.value)}
          />
        </div>
        {email.warning && <p className="text-warning">Formato de correo incorrecto</p>}
        <div className="login-buttons">
          <button className="button" onClick={handleSubmit} disabled={email.warning || loading}>
            <span className="material-icons button-icon">lock_reset</span>
            Recuperar contraseña
          </button>
        </div>
      </motion.div>
      <Modal isOpen={openModal}>
        <p className="text">Hemos enviado un correo con las instrucciones que debes seguir para recuperar tu contaseña.</p>
        <div className="text">
          <button className="button dismiss" onClick={() => navigate("/")}>
            <span className="material-icons button-icon">home</span>
            Ir al inicio
          </button>
        </div>
      </Modal>
    </div>
  )
}
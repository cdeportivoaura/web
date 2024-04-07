import { useContext, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { AuthContext } from "../Auth/AuthProvider"
import Logo from "../Logo/Logo"

function validatePassword(password) {
  return Boolean(String(password)
  .match(
    /.{6,}/
  ))
}

export function PasswordReset() {
  const { uuid } = useParams()
  let navigate = useNavigate()
  const [password, setPassword] = useState({pass: "", warning: false})
  const [passwordConfirm, setPasswordConfirm] = useState({pass: "", warning: false})
  const [loading, setLoading] = useState(false)
  let auth = useContext(AuthContext)

  function checkPassword(pass) {
    setPassword({
      pass: pass,
      warning: !validatePassword(pass)
    })
  }

  function checkPasswordConfirm(pass) {
    setPasswordConfirm({
      pass: pass,
      warning: password.pass !== pass
    })
  }

  function handleSubmit() {
    setLoading(true)
    auth.updatePassword(uuid, password.pass)
    .then(updated => {
      if (updated[0]) {
        navigate("/")
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
        <div className={(password.warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">password</span>
          <input
            type="password"
            placeholder="Contraseña"
            value={password.pass}
            onChange={(e) => checkPassword(e.target.value)}
          />
        </div>
        {password.warning && <p className="text-warning">La contraseña debe tener al menos 6 caracteres</p>}
        <div className={(passwordConfirm.warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">password</span>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={passwordConfirm.pass}
            onChange={(e) => checkPasswordConfirm(e.target.value)}
          />
        </div>
        {passwordConfirm.warning && <p className="text-warning">Las contraseñas no coinciden</p>}
        <div className="login-buttons">
          <button className="button" onClick={handleSubmit} disabled={password.warning || passwordConfirm.warning || loading}>
            <span className="material-icons button-icon">login</span>
            Reestablecer Contraseña
          </button>
        </div>
      </motion.div>
    </div>
  )
}
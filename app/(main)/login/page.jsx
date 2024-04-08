"use client"

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/components/Auth/AuthProvider";
import { motion } from "framer-motion";
import Logo from "@/app/components/Logo/Logo";
import "./Login.scss"

export default function Login() {
  let router = useRouter()
  let { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit() {
    setLoading(true)
    setError("")
    login(email, password)
      .then(isLogged => {
        if (isLogged) {
          // Send them back to the page they tried to visit when they were
          // redirected to the login page. Use { replace: true } so we don't create
          // another entry in the history stack for the login page.  This means that
          // when they get to the protected page and click the back button, they
          // won't end up back on the login page, which is also really nice for the
          // user experience.)
          router.back()
        } else {
          setError("Wrong credentials or user not found")
        }
        setLoading(false)
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
        <div className="field">
          <span className="material-icons button-icon">mail</span>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <span className="material-icons button-icon">password</span>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <span className="text-danger">Credenciales incorrectas</span>}
        <div className="login-buttons">
          <button className="button" onClick={handleSubmit}>
            <span className="material-icons button-icon">login</span>
            Ingresar
          </button>
          <button className="button dismiss" onClick={() => router.back()}>
            <span className="material-icons button-icon">close</span>
            Cancelar
          </button>
        </div>
        <span className="text-link">
          Puedes registrarte haciendo click <a onClick={() => router.push("/register")}>aquí</a>
        </span>
        <span className="text-link">
          <a onClick={() => navigate("/password_recovery")}>Recuperar contraseña</a>
        </span>
      </motion.div>
    </div>
  );
}
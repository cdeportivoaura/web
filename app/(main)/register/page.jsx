"use client"

import { useContext, useReducer, useState } from "react";
import { ThemeContext } from "@/app/components/Theme/ThemeProvider";
import { motion } from "framer-motion";
import { Authentication } from "@/helpers/Authentication";
import Logo from "@/app/components/Logo/Logo";
import "../login/Login.scss"
import { useRouter } from "next/navigation";

function validateEmail(email) {
  return Boolean(String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
}

function validatePhone(phone) {
  return Boolean(String(phone)
    .match(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    ))
}

function validatePassword(password) {
  return Boolean(String(password)
    .match(
      /.{6,}/
    ))
}

function reducer(state, action) {
  switch (action.type) {
    case "set_first_name":
      return { ...state, first_name: action.first_name, first_name_warning: (action.first_name === "") }

    case "set_last_name":
      return { ...state, last_name: action.last_name, last_name_warning: (action.last_name === "") }

    case "set_birthday":
      return { ...state, birthday: action.birthday }

    case "set_subscribed":
      return { ...state, subscribed: action.subscribed }

    case "set_phone":
      return { ...state, phone: action.phone, phone_warning: !validatePhone(action.phone) }

    case "set_email":
      return { ...state, email: action.email, email_warning: !validateEmail(action.email) }

    case "set_password":
      return { ...state, password: action.password, password_warning: !validatePassword(action.password), password_confirm_warning: (state.password_confirm !== action.password) }

    case "set_password_confirm":
      return { ...state, password_confirm: action.password_confirm, password_confirm_warning: (state.password !== action.password_confirm) }

    default:
      return { ...state }
  }
}

export default function Register() {
  let router = useRouter()
  let theme = useContext(ThemeContext)
  const [state, dispatch] = useReducer(reducer, {
    first_name: "",
    first_name_warning: false,
    last_name: "",
    last_name_warning: false,
    birthday: "",
    birthday_warning: false,
    subscribed: "",
    phone: "",
    phone_warning: false,
    email: "",
    email_warning: false,
    password: "",
    password_warning: false,
    password_confirm: "",
    password_confirm_warning: false
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    if (
      !Boolean(state.first_name) ||
      !Boolean(state.last_name) ||
      !Boolean(state.email) ||
      !Boolean(state.birthday) ||
      !Boolean(state.password) ||
      !Boolean(state.password_confirm) ||
      !Boolean(state.phone) ||
      (state.subscribed === "") ||
      state.first_name_warning ||
      state.last_name_warning ||
      state.phone_warning ||
      state.email_warning ||
      state.password_warning ||
      state.password_confirm_warning
    ) {
      setLoading(false)
      return alert("Alguno de los campos se encuentra vacío o no sigue el formato requerido.")
    }

    // Register user in DB
    let user = await Authentication.create({ ...state, theme: theme.theme })
    setLoading(false)
    if ('error' in user) {
      alert(user.error)
    } else {
      router.push('/')
    }
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
        <h3 className="subtitle">Registro de nuevo usuario</h3>
        <div className={(state.first_name_warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">person</span>
          <input
            type="text"
            placeholder="Nombres"
            value={state.first_name}
            onChange={(e) => dispatch({ type: "set_first_name", first_name: e.target.value })}
          />
        </div>
        {state.first_name_warning && <p className="text-warning">Tu nombre no puede estar vacío</p>}
        <div className={(state.last_name_warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">person</span>
          <input
            type="text"
            placeholder="Apellidos"
            value={state.last_name}
            onChange={(e) => dispatch({ type: "set_last_name", last_name: e.target.value })}
          />
        </div>
        {state.last_name_warning && <p className="text-warning">Tu apellido no puede estar vacío</p>}
        <div className="field">
          <span className="material-icons button-icon">today</span>
          <span className="placeholder">Fecha de nacimiento</span>
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={state.birthday}
            onChange={(e) => dispatch({ type: "set_birthday", birthday: e.target.value })}
          />
        </div>
        <div className="field">
          <span className="material-icons button-icon">favorite_border</span>
          <label>Eres actualmente miembro del club deportivo?</label>
          <label htmlFor="subYes">Si</label>
          <input
            type="radio"
            name="subscribed"
            id="subYes"
            value={true}
            onChange={(e) => dispatch({ type: "set_subscribed", subscribed: true })}
          />
          <label htmlFor="subNo">No</label>
          <input
            type="radio"
            name="subscribed"
            id="subNo"
            value={false}
            onChange={(e) => dispatch({ type: "set_subscribed", subscribed: false })}
          />
        </div>
        <div className={(state.phone_warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">phone</span>
          <input
            type="text"
            placeholder="Teléfono, ejemplo: +56 9 1111 1111"
            value={state.phone}
            onChange={(e) => dispatch({ type: "set_phone", phone: e.target.value })}
          />
        </div>
        <div className={(state.email_warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">mail</span>
          <input
            type="mail"
            placeholder="Correo electrónico"
            value={state.email}
            onChange={(e) => dispatch({ type: "set_email", email: e.target.value })}
          />
        </div>
        {state.email_warning && <p className="text-warning">Formato incorrecto</p>}
        <div className={(state.password_warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">password</span>
          <input
            type="password"
            placeholder="Contraseña"
            value={state.password}
            onChange={(e) => dispatch({ type: "set_password", password: e.target.value })}
          />
        </div>
        {state.password_warning && <p className="text-warning">La contraseña debe tener al menos 6 caracteres</p>}
        <div className={(state.password_confirm_warning) ? "field warning" : "field"}>
          <span className="material-icons button-icon">password</span>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={state.password_confirm}
            onChange={(e) => dispatch({ type: "set_password_confirm", password_confirm: e.target.value })}
          />
        </div>
        {state.password_confirm_warning && <p className="text-warning">Las contraseñas no coinciden</p>}
        <div className="login-buttons">
          <button className="button" onClick={handleSubmit} disabled={loading}>
            {(loading) ?
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="material-icons button-icon"
              >refresh</motion.span> :
              <span className="material-icons button-icon">{(loading) ? "refresh" : "person_add"}</span>}
            Registrar
          </button>
          <button className="button dismiss" onClick={() => router.back()}>
            <span className="material-icons button-icon">close</span>
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
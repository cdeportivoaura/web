"use client"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/components/Auth/AuthProvider"
import { Buffer } from 'buffer'
import "./Profile.scss"


function isoStringToLocale(date) {
  return `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(0, 4)}`
}

export default function Profile() {
  const { user, getImage } = useContext(AuthContext)
  const [image, setImage] = useState("")

  useEffect(() => {
    getImage().then(data => {
      setImage(`data:${data.image.contentType};base64,${Buffer.from(data.image.data.data.reduce((data, byte) => data + String.fromCharCode(byte), ''), 'ascii').toString('base64')}`)
    })
  }, [])

  return (
    <div className="profile">
      <div className="image">
        <img
          src={image}
        // onError={(e)=>{e.target.onerror = null; e.target.src=`/img/users/example.jpg`}}
        />
      </div>
      <div className="info">
        <span>Nombres:</span>
        <span>{user.user.first_name}</span>
        <span>Apellidos:</span>
        <span>{user.user.last_name}</span>
        <span>Correo:</span>
        <span>{user.user.email}</span>
        <span>Fecha de nacimiento:</span>
        <span>{isoStringToLocale(user.user.birthday)}</span>
        <span>Miembro del club deportivo:</span>
        <span>{user.user.subscribed ? "Sí" : "No"}</span>
      </div>
    </div>
  )
}
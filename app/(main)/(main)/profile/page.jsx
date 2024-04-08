"use client"

import { Suspense, useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/components/Auth/AuthProvider"
import { Buffer } from 'buffer'
import "./Profile.scss"
import Image from "next/image"

export default function Page() {
  return (
    <Suspense fallback={<h1>Cargando perfil...</h1>}>
      <Profile />
    </Suspense>
  )
}

function Profile() {
  const { user, getImage } = useContext(AuthContext)
  const [image, setImage] = useState("")

  useEffect(() => {
    getImage().then(data => {
      if (data.image) {
        if ("contentType" in data.image && "data" in data.image) {
          setImage(`data:${data.image.contentType};base64,${Buffer.from(data.image.data.data.reduce((data, byte) => data + String.fromCharCode(byte), ''), 'ascii').toString('base64')}`)
        }
      }
    })
  }, [getImage])

  if (!user)
    return (<h1>Cargando perfil...</h1>)

  console.log(user)

  return (
    <div className="profile">
      <div className="image">
        <img
          src={image}
          alt={user.first_name}
        // width={300}
        // height={300}
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
        <span>{new Date(user.user.birthday).toLocaleDateString()}</span>
        <span>Miembro del club deportivo:</span>
        <span>{user.user.subscribed ? "Sí" : "No"}</span>
      </div>
    </div>
  )
}
"use client"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/components/Auth/AuthProvider"
import { UserHandler } from "@/helpers/UserHandler"
import UserCard from "./UserCard"

export default function Users() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user)
      UserHandler.getAll(user)
        .then(list => {
          console.log(list)
          setUsers(list)
        })
  }, [user])

  let userJSX = []
  users.results?.map((u, i) => {
    userJSX.push(
      <UserCard key={i} user={u} />
    )
  })

  return (
    <div className="home">
      {userJSX}
    </div>
  )
}
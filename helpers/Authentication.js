"use client"

import { useEffect, useState } from "react"

export function useGetUser() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    let user = localStorage.getItem('user')
    setUser(JSON.parse(user))
  }, [])

  return user
}

export function useLogin() {
  async function login(email, password) {
    try {
      const res = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify({ user: { email: email, password: password } }),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        let data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        return [data, undefined]
      }
      return [null, res.statusText]
    } catch (error) {
      if (error instanceof Error) {
        return [null, error.toString()]
      } else {
        return [null, "Unexpected error"]
      }
    }
  }

  return login
}

export const Authentication = {
  getUser() {
    let user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    } else {
      return null
    }
  },

  compareRoles(role) {
    let userRole = this.getUser()?.user?.role
    let userLevel = this.getPermissionLevel(userRole)
    let requiredLevel = this.getPermissionLevel(role)
    return (userLevel >= requiredLevel)
  },

  getPermissionLevel(role) {
    switch (role) {
      case "Reader":
        return 0
      case "User":
        return 1
      case "Member":
        return 2
      case "Coordinator":
        return 3
      case "Staff":
        return 4
      case "Admin":
        return 5
      default:
        return 0
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify({ user: { email: email, password: password } }),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        let data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        return [data, undefined]
      }
      return [null, res.statusText]
    } catch (error) {
      if (error instanceof Error) {
        return [null, error.toString()]
      } else {
        return [null, "Unexpected error"]
      }
    }
  },

  async passwordRecovery(email) {
    const res = await fetch(`/api/user/password_recovery`, {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) {
      let data = await res.json()
      return data
    }

    throw new Error('Something happened')
  },


  async updatePassword(uuid, password) {
    const res = await fetch(`/api/user/update_password`, {
      method: 'POST',
      body: JSON.stringify({ uuid: uuid, password: password }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) {
      let data = await res.json()
      return data
    }

    throw new Error('Something happened')
  },

  logout() {
    try {
      localStorage.removeItem('user')
    } catch (error) {
      console.log(error)
    }
  },

  async update(user, changes) {
    try {
      const res = await fetch(`/api/user/update?_id=${user.user._id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (res.status === 200) {
        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data))
        return
      }
    } catch (error) {
      console.log(error)
    }
  },

  async getImage(user) {
    try {
      const res = await fetch(`/api/user/image?_id=${user.user._id}`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (res.status === 200) {
        return await res.json()
      } else {
        this.logout()
      }
    } catch (error) {
      return error
    }
  },

  async create(user) {
    try {
      const res = await fetch('/api/user/create', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      return await res.json()
    } catch (error) {
      return error
    }
  }
}

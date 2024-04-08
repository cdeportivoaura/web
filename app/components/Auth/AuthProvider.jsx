"use client"

import { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Authentication, useGetUser, useLogin } from "@/helpers/Authentication";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const initialUser = useGetUser()
  const authLogin = useLogin()
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(Boolean(initialUser))
  const pathname = usePathname()

  useEffect(() => {
    if (Boolean(initialUser)) {
      setUser(initialUser)
      setIsUserLoggedIn(true)
    }
  }, [initialUser])

  async function login(username, password) {
    let [user, message] = await authLogin(username, password)
    if (!Boolean(user)) return Promise.resolve(false)
    setUser(user)
    setIsUserLoggedIn(true)
    return Promise.resolve(true)
  }

  async function updatePassword(uuid, password) {
    try {
      await Authentication.updatePassword(uuid, password)
      return Promise.resolve([true, null])
    } catch (error) {
      return Promise.resolve([false, error])
    }
  }

  async function passwordRecovery(email) {
    try {
      await Authentication.passwordRecovery(email)
      return Promise.resolve([true, null])
    } catch (error) {
      return Promise.resolve([false, error])
    }
  }

  async function logout() {
    Authentication.logout()
    setUser(null)
    setIsUserLoggedIn(false)
  }

  function isTokenValid() {
    let decodedToken = jwtDecode(user.token)
    if (new Date() >= new Date(decodedToken.exp * 1000)) {
      logout()
      console.log("Tu sesión ha expirado")
      return false
    }
    return true
  }

  function isAllowed(role) {
    return Authentication.compareRoles(role)
  }

  async function getImage() {
    if (isUserLoggedIn) {
      return await Authentication.getImage(user)
    } else {
      return `/example-M.jpg`
    }
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      isTokenValid()
    }
  }, [pathname, children, user, isUserLoggedIn, isTokenValid])

  let value = {
    user,
    login,
    logout,
    isTokenValid,
    getImage,
    updatePassword,
    passwordRecovery,
    isAllowed,
    isUserLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
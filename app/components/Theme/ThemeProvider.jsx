import { useContext } from "react"
import { createContext, useState, useEffect } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import { Authentication } from "@/helpers/Authentication"


export const ThemeContext = createContext(null)

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('es')
  const { user, isUserLoggedIn } = useContext(AuthContext)

  async function toggleTheme() {
    let newTheme = (theme === "dark") ? "light" : "dark"
    setTheme(newTheme)
    if (isUserLoggedIn) {
      await Authentication.update(user, { theme: newTheme })
    }
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      setTheme(user.user.theme)
    }
  }, [user, isUserLoggedIn])

  useEffect(() => {
    document.body.classList.value = theme;
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}
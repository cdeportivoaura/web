"use client"

import AuthProvider from '../components/Auth/AuthProvider'
import ThemeProvider from '../components/Theme/ThemeProvider'


export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}

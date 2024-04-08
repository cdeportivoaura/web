"use client"

import Navbar from '@/app/components/Navbar/Navbar'
import MobileMenu from '@/app/components/Navbar/MobileMenu'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { AuthContext } from '@/app/components/Auth/AuthProvider'
import { useContext } from 'react'


export default function Layout({ children }) {
  const navigate = useRouter()
  const pathname = usePathname()
  const { logout } = useContext(AuthContext)

  let links = [
    { name: "Inicio", to: "/", icon: "home", permissionRequired: "None" },
    { name: "Reserva multicancha", to: "/calendar", icon: "calendar_month", permissionRequired: "None" },
    { name: "Reserva gimnasio", to: "/gym_calendar", icon: "calendar_month", permissionRequired: "None" },
    // { name: "Deportes", to: "/sports", icon: "sports", permissionRequired: "None" },
    // { name: "Perfil", to: "/profile", icon: "face", permissionRequired: "User" },
    // { name: "Users", to: "/users", icon: "group", permissionRequired: "Staff" },
    { name: "Contacto", to: "/contact", icon: "support_agent", permissionRequired: "None" },
    { name: "Ingresar", to: undefined, icon: "login", permissionRequired: "Unlogged", onClick: () => navigate.push("/login", { state: { from: pathname } }) },
    { name: "Cerrar Sesión", to: undefined, icon: "logout", permissionRequired: "User", onClick: () => { logout(); navigate.push("/") } }
  ]
  return (
    <>
      <Navbar links={links} />
      <div className="main">
        {children}
      </div>
      <MobileMenu links={links} />
    </>
  )
}

import { motion } from 'framer-motion'
import { useState, useContext, useRef, useEffect } from 'react'
import { ThemeContext } from '../../Theme/ThemeProvider'

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useContext(ThemeContext)

  const settingsRef = useRef(null)
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsRef])

  return (
    <div ref={settingsRef} className="link-text settings">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="material-icons link-icon">
          {isOpen ? "close" : "settings"}
      </span>
      <motion.ul
        key={"dropdown"}
        variants={{
          open: {
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            opacity: 0,
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
              delay: 0.1
            }
          }
        }}
        animate={isOpen ? "open" : "closed"}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li
          variants={itemVariants}
          onClick={() => theme.toggleTheme()}
        >
          <span className="material-icons dropdown-icon">{(theme.theme === "dark") ? "light_mode" : "dark_mode"}</span>
          {(theme.theme === "dark") ? "Modo claro" : "Modo oscuro"}
        </motion.li>
      </motion.ul>
    </div>
  )
}
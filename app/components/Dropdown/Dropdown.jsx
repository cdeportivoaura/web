import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import "./Dropdown.scss"

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
}

export default function Dropdown({ placeholder="Seleccione una opción", selectedOption, setSelectedOption, options, closeAfterSelect=false}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef])

  let optionsList = []
  options.map((opt, index) => {
    optionsList.push(
      <motion.li
        key={`option_${index}`}
        variants={itemVariants}
        onClick={() => {
          setSelectedOption(opt.name)
          if (closeAfterSelect) setIsOpen(false)
        }}
      >
        <span className="material-icons dropdown-icon">{opt.icon}</span>
        {opt.name}
      </motion.li>
    )
  })

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button">
          {(Boolean(selectedOption)) ? selectedOption : placeholder}
        <span className="material-icons dropdown-icon">arrow_drop_down</span>
      </button>
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
        {optionsList}
      </motion.ul>
    </div>
  )
}
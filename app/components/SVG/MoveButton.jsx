import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function MoveButton({ sport, openSport, setOpenSport, children }) {
  const [animate, setAnimate] = useState("hidden")
  const btnRef = useRef()
  const [variants, setVariants] = useState({})

  useEffect(() => {
    setVariants({
      visible: {
        opacity: 1,
        x: -btnRef.current.offsetLeft + 10,
        y: (window.innerWidth < 951) ? -btnRef.current.offsetTop : -btnRef.current.offsetTop + 97,
        transition: {
          delay: 0.5,
          duration: 1
        }
      },
      hidden: { opacity: 1, x: 0, y: 0},
      none: { opacity: 0, x: 0, y: 0 }
    })
  }, [])

  useEffect(() => {
    if (openSport === "") {
      setAnimate("hidden")
    } else if (openSport === sport) {
      setAnimate("visible")
    } else {
      setAnimate("none")
    }
  }, [openSport])

  return (
    <motion.div
      ref={btnRef}
      animate={animate}
      variants={variants}
      onClick={() => setOpenSport(sport)}
    >
      {children}
    </motion.div>
  )
}
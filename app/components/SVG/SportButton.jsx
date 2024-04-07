import { motion } from "framer-motion"

const draw = {
  hidden: { pathLength: 0, opacity: 0.5 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 5 },
      opacity: { duration: 0.5 }
    }
  }
}

export function SportButton({ sport, openSport }) {
  return (
    <motion.svg
      className="svgButton"
      width="100%"
      height="100%"
      viewBox={sport.viewBox}
      initial="hidden"
      whileHover="visible"
      animate={(openSport === sport.name) ? "visible" : "hidden"}
      style={{
        cursor: "pointer",
        rotate: (sport.rotate) ? "180deg":"",
        scaleX: (sport.flip) ? "-1":"1"
      }}
    >
      <motion.path
        width="140"
        height="140"
        x="410"
        y="430"
        rx="20"
        fill="var(--navbar-bg-color)"
        stroke="var(--text-color)"
        strokeWidth={sport.strokeWidth}
        variants={draw}
        custom={0}
        d={sport.path}
      />
    </motion.svg>
  )
}
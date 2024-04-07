import { motion } from 'framer-motion'

const eventVariants = {
  open: {
    opacity: 1,
    color: "var(--text-color)",
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { 
    opacity: 0,
    y: 20,
    color: "var(--accent)",
    transition: { duration: 0.2 }
  }
}

export default function EventContent(eventInfo) {
  return (
    <>
      <motion.div
        className="calendar-event"
        initial="closed"
        whileHover="open"
        variants={{
          open: {
            color: "var(--accent)"
          },
          closed: {
            color: "var(--text-color)"
          }
        }}
      >
        <b>{eventInfo.timeText}</b>
        <span className="inline-event">{eventInfo.event.title}</span>
        {eventInfo.view.type === "dayGridMonth" && <br />}
        <motion.span className="inline-event accent"
          variants={{
            open: {
              opacity: 0
            },
            closed: {
              opacity: 1
            }
          }}
        >[{eventInfo.event.extendedProps.name}]</motion.span>
        <motion.div
          className="hidden-info"
          style={{marginTop: (eventInfo.view.type === "dayGridMonth") ? "-15px":"0"}}
          variants={{
            open: {
              opacity: 1,
              display: "block",
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
              display: "none",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
                delay: 0.1
              }
            }
          }}
        >
          <motion.span variants={eventVariants}>{eventInfo.event.extendedProps.name}</motion.span>
          {eventInfo.event.extendedProps.others?.map((el, idx) => {
            return (
              <motion.span key={`eventPerson${idx}`} variants={eventVariants}>{el.name}</motion.span>
            )
          })}
        </motion.div>
      </motion.div>
    </>
  )
}

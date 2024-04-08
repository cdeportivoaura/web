"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SportButton } from "@/app/components/SVG/SportButton"
import MoveButton from "@/app/components/SVG/MoveButton"
import { SportHandler } from "@/helpers/SportHandler"
import { UserHandler } from "@/helpers/UserHandler"
import { Buffer } from 'buffer'
import "./Sports.scss"

const sportDetails = {
  open: {
    clipPath: `circle(2200px at 0 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    clipPath: "circle(30px at 0 0)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

const emptySpace = {
  open: { scale: 1, transition: { delay: 1.5 } },
  closed: { scale: 0 }
}

const hiddenText = {
  open: { opacity: 1, transition: { delay: 1.5 } },
  closed: { opacity: 0 }
}

const growComponent = {
  open: { scale: 1, transition: { delay: 2.2 } },
  closed: { scale: 0 }
}

export default function Sports() {
  const [openSport, setOpenSport] = useState("")
  const [sports, setSports] = useState([])
  const [coordinator, setCoordinator] = useState(undefined)

  useEffect(() => {
    SportHandler.getAll()
      .then(res => setSports(res.results))
  }, [])

  useEffect(() => {
    if (Boolean(openSport)) {
      if ("userId" in sports.filter(s => s.name === openSport)[0].coordinator) {
        UserHandler.getCoordinator(sports.filter(s => s.name === openSport)[0].coordinator.userId)
          .then(res => setCoordinator(res.result))
      } else {
        setCoordinator(sports.filter(s => s.name === openSport)[0].coordinator)
      }
    } else {
      setCoordinator(undefined)
    }
  }, [openSport, sports])

  let sportButtons = []
  sports.map((sport, index) => {
    sportButtons.push(
      <MoveButton key={index} openSport={openSport} setOpenSport={setOpenSport} sport={sport.name}>
        <SportButton sport={sport} openSport={openSport} />
      </MoveButton>
    )
  })

  let selectedSport = sports.filter(s => s.name === openSport)[0]
  let descriptionPars = []
  if (selectedSport?.description) {
    descriptionPars.push(
      <h3 key="descriptionTitle">Descripción:</h3>
    )
    selectedSport?.description.split('\n').map((par, idx) => {
      descriptionPars.push(
        <p className="description-par" key={`par_${idx}`}>{par}</p>
      )
    })
  }

  let coordImg = null
  if (Boolean(coordinator) && "image" in coordinator) {
    coordImg = <img className="img" src={`data:${coordinator?.image.contentType};base64,${Buffer.from(coordinator?.image.data.data.reduce((data, byte) => data + String.fromCharCode(byte), ''), 'ascii').toString('base64')}`} />
  } else {
    coordImg = (
      <svg className="img" style={{ fill: "var(--accent)" }} viewBox="0 0 1024 1024"><path d="M512 597.994667q108.010667 0 225.002667 46.997333t116.992 123.008l0 85.994667-684.010667 0 0-85.994667q0-76.010667 116.992-123.008t225.002667-46.997333zM512 512q-69.994667 0-120-50.005333t-50.005333-120 50.005333-121.002667 120-51.008 120 51.008 50.005333 121.002667-50.005333 120-120 50.005333z" /></svg>
    )
  }

  return (
    <>
      <div className="sports-grid">
        {sportButtons}
      </div>
      <motion.div
        animate={(openSport === "") ? "closed" : "open"}
        variants={sportDetails}
        className="sport-details"
      >
      </motion.div>
      <motion.div
        animate={(openSport === "") ? "closed" : "open"}
        variants={sportDetails}
        className="sport-container"
      >
        <div className="details-container">
          <motion.div variants={emptySpace} className="empty-space" />
          <motion.div initial="closed" animate={(openSport === "") ? "closed" : "open"} variants={hiddenText} className="title">
            <h2 className="sport-title">{selectedSport?.spName}</h2>
            <div className="text"></div>
            <motion.div initial="closed" animate={(openSport === "") ? "closed" : "open"} variants={growComponent} className="coordinator">
              <div className="image">{coordImg}</div>
              <span className="coord">Encargado de la rama:</span>
              <span className="coordName">{coordinator?.name}</span>
              <a className="email" href={`mailto:${coordinator?.email}`}>{coordinator?.email}</a>
            </motion.div>
          </motion.div>
          <span
            className="button material-icons close-btn"
            onClick={() => setOpenSport("")}
          >close</span>
          <motion.div initial="closed" animate={(openSport === "") ? "closed" : "open"} variants={hiddenText} className="body">
            {descriptionPars}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}


import { useEffect, useState } from "react"
import { New } from "./New"
import { NewDetails } from "./NewDetails"
import Modal from "../Modal/Modal"
import "./News.scss"

export function News() {
  const [news, setNews] = useState([])
  const [newDetails, setNewDetails] = useState({ title: "", googleId: "", body: "" })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetch("/api/new/all", {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setNews(data.results))
  }, [])

  let newList = []
  news.map((info, idx) => {
    newList.push(<New key={idx} info={info} setNewDetails={setNewDetails} setIsOpen={setIsOpen} />)
  })

  return (
    <div className="news">
      <h3>Noticias</h3>
      {newList}
      <Modal isOpen={isOpen}>
        <NewDetails info={newDetails} />
        <button className="button close-modal" onClick={() => setIsOpen(false)}>
          <span className="material-icons button-icon">close</span>
        </button>
      </Modal>
    </div>
  )
}

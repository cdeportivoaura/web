import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function NewDetails({ info }) {
  return (
    <div className="modal-new">
      <img src={`https://lh3.google.com/u/0/d/${info.googleId}`} />
      <span className="title">{info.title}</span>
      <span className="date">{(new Date(info.date)).toLocaleDateString()}</span>
      <Markdown remarkPlugins={[remarkGfm]}>{info.body}</Markdown>
      {(info.gallery) && <a className="button" target={"_blank"} href={info.gallery}>
        <span className="material-icons button-icon">image</span>
        Ver galería de imágenes
      </a>}
    </div>
  )
}

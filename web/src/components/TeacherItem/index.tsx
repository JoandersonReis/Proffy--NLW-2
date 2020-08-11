import React from "react"
import whatsappIcon from "../../assets/images/icons/whatsapp.svg"

import "./styles.css"

interface Props {
  teacher: {
    id: number,
    name: string,
    avatar: string,
    subject: string,
    user_id: number,
    cost: number,
    whatsapp: string,
    bio: string
  }
}

const TeacherItem: React.FC<Props> = ({teacher}) => {
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name}/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
          <a href={`https://wa.me/${teacher.whatsapp}`} target="_blank">
          <img src={whatsappIcon} alt="Entrar em contato"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem

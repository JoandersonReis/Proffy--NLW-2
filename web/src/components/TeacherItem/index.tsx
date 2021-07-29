import React from "react"

import "./styles.css"

import whatsappIcon from "../../assets/images/icons/whatsapp.svg"
import api from "../../services/api"

interface TeacherItemProps {
  teacher : {
    id: number,
    name: string,
    subject: string,
    cost: number,
    avatar: string,
    whatsapp: string,
    bio: string
  }
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
  function createNewConnection() {
    api.post("connections", {
      user_id: teacher.id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Imagem Proffy" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>Preço/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>

        <a 
          href={`http://wa.me/55${teacher.whatsapp}`} 
          target="_blank"
          onClick={createNewConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem

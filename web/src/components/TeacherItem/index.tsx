import React, { useState } from "react"

import "./styles.css"

import whatsappIcon from "../../assets/images/icons/whatsapp.svg"
import api from "../../services/api"
import { useEffect } from "react"
import convertNumberInWeekDay from "../../utils/convertNumberInWeekDay"

interface TeacherItemProps {
  teacher : {
    id: number,
    name: string,
    lastname: string,
    subject: string,
    cost: number,
    avatar: string,
    whatsapp: string,
    bio: string
  }
}

interface ScheduleProps {
  id: number,
  week_day: number,
  from: number,
  to: number
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
  const [ schedule, setSchedule ] = useState<ScheduleProps[]>([])

  function createNewConnection() {
    api.post("connections", {
      user_id: teacher.id
    })
  }

  useEffect(() => {
    api.get("/schedules", {
      params: {
        class_id: teacher.id
      }
    }).then(response => (
      setSchedule(response.data)
    ))
  }, [])

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Imagem Proffy" />
        <div>
          <strong>{teacher.name} {teacher.lastname}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <div className="schedule-classes-container">
        {schedule.map(item => (
          <div className="schedule-class">
            <p>Dia</p>
            <h3>{convertNumberInWeekDay(item.week_day)}</h3>
            <p>Horário</p>
            <h3>{item.from / 60}H - {item.to / 60}H</h3>
          </div>
        ))}
      </div>

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

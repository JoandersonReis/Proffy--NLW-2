import React, { useState, FormEvent } from "react"

import "./styles.css"

import PageHeader from "../../components/PageHeader"
import TeacherItem from "../../components/TeacherItem"
import Input from "../../components/Input"
import Select from "../../components/Select"
import api from "../../services/api"

interface Teachers {
  id: number,
  name: string,
  avatar: string,
  subject: string,
  user_id: number,
  cost: number,
  whatsapp: string,
  bio: string
}

function TeacherList() {
  const [ subject, setSubject ] = useState("")
  const [ week_day, setWeekDay ] = useState("")
  const [ time, setTime ] = useState("")

  const [ teachers, setTeachers ] = useState<Teachers[]>([])

  async function searchTeachers(e: FormEvent) {
    e.preventDefault()

    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
  }

  return (
    <div className="container" id="page-teacher-list">
      <PageHeader title="Esses são os Proffys disponíveis." >
        <form id="search-teachers" onSubmit={searchTeachers}>
        <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Português", label: "Português" },
              { value: "Matemática", label: "Matemática" },
              { value: "Ciências", label: "Ciências" },
              { value: "Biologia", label: "Biologia" },
              { value: "Química", label: "Química" },
              { value: "História", label: "História" },
              { value: "Física", label: "Física" },
              { value: "Filosofia", label: "Filosofia" },
              { value: "Sociologia", label: "Sociologia" }
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da Semana"
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda" },
              { value: "2", label: "Terça" },
              { value: "3", label: "Quarta" },
              { value: "4", label: "Quinta" },
              { value: "5", label: "Sexta" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input 
            type="time" 
            name="time" 
            label="Hora"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map(teacher => (
          <TeacherItem teacher={teacher} key={String(teacher.id)} />
        ))}
        
      </main>
    </div>
  )
}

export default TeacherList

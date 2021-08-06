import React, { FormEvent, useState } from "react"

import PageHeader from "../../components/PageHeader"
import TeacherItem from "../../components/TeacherItem"
import Input from "../../components/Input"
import Select from "../../components/Select"
import api from "../../services/api"

import searchIcon from "../../assets/images/icons/search.png"
import smileIcon from "../../assets/images/icons/smile.svg"

import "./styles.css"

function TeacherList() {
  const [ week_day, setWeek_day ] = useState("")
  const [ subject, setSubject ] = useState("")
  const [ time, setTime ] = useState("")

  const [ teachers, setTeachers ] = useState([])

  function handleSearchTeachers(e: FormEvent) {
    e.preventDefault()

    api.get("classes", {
      params: {
        week_day,
        subject,
        time
      }
    }).then(response => {
      setTeachers(response.data)
    }).catch(() => {
      alert("Não foi possivel carregar os Proffys!")
    })
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader 
        title="Estes são os proffys disponíveis." 
        sideComponent={
          <div className="total-proffys">
            <img src={smileIcon} alt="Emoji de sorriso" />
            <p className="total-proffys-text">Nós Temos 32 Proffys.</p>
          </div>
        }
      >
        <form onSubmit={handleSearchTeachers} className="search-teachers">
          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Química", label: "Química" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Português", label: "Português" },
              { value: "Física", label: "Física" },
              { value: "Sociologia", label: "Sociologia" },
              { value: "Filosofia", label: "Filosofia" },
              { value: "Biologia", label: "Biologia" },
              { value: "Matemática", label: "Matemática" }
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da semana"
            value={week_day}
            onChange={e => setWeek_day(e.target.value)}
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

          <button type="submit">
            <img src={searchIcon} alt="Buscar" />
          </button>
        </form>
      </PageHeader>

      <main>
      {teachers.length > 0? 
          teachers.map((teacher: any) => {
            return <TeacherItem key={teacher.id} teacher={teacher} />
          })
          : 
          <p className="empty-proffys">Nenhum professor encontrado em sua pesquisa.</p>
        }
      </main>
    </div>
  )
}

export default TeacherList

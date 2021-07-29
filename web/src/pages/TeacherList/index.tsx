import React, { FormEvent, useState } from "react"

import PageHeader from "../../components/PageHeader"
import TeacherItem from "../../components/TeacherItem"
import Input from "../../components/Input"
import Select from "../../components/Select"
import api from "../../services/api"

import searchIcon from "../../assets/images/icons/search.png"

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
      <PageHeader title="Estes são os proffys disponíveis.">
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
              { value: "Biologia", label: "Biologia" }
              
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
        {teachers.map((teacher: any) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
        
      </main>
    </div>
  )
}

export default TeacherList

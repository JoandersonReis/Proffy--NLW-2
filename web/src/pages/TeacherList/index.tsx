import React, { FormEvent, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import PageHeader from "../../components/PageHeader"
import TeacherItem from "../../components/TeacherItem"
import Input from "../../components/Input"
import Select from "../../components/Select"
import BoxMessage from "../../components/BoxMessage"
import api from "../../services/api"

import searchIcon from "../../assets/images/icons/search.png"
import smileIcon from "../../assets/images/icons/smile.svg"

import "./styles.css"
import indenfyLogged from "../../utils/indenfyLogged"

function TeacherList() {
  const history = useHistory()

  const [ week_day, setWeek_day ] = useState("")
  const [ subject, setSubject ] = useState("")
  const [ time, setTime ] = useState("")
  const [ totalProffys, setTotalProffys ] = useState(0)
  const [ errorMessage, setErrorMessage ] = useState(false)

  const [ teachers, setTeachers ] = useState([])

  function handleSearchTeachers(e: FormEvent) {
    e.preventDefault()

    api.get("search", {
      params: {
        week_day,
        subject,
        time
      }
    }).then(response => {
      setTeachers(response.data)

      if(response.data.length == 0) {
        errorMessage? setErrorMessage(false):setErrorMessage(true)

        setWeek_day("")
        setSubject("")
        setTime("")
      }
    }).catch(() => {
      alert("Não foi possivel carregar os Proffys!")
    })
  }

  function loadingTeachers() {
    api.get("classes").then(response => {
      setTeachers(response.data)
    })

    api.get("users").then(response => {
      setTotalProffys(response.data.totalProffys)
    })
  }

  useEffect(() => {
    loadingTeachers()

    
    if(!indenfyLogged()) {
      history.push("/")
    }
  }, [errorMessage])

  return (
    <div id="page-teacher-list" className="container">
      {errorMessage && 
        <BoxMessage text="Nenhum Proffy encontrado" seconds={2} />
      }
      <PageHeader 
        title="Estes são os proffys disponíveis." 
        sideComponent={
          <div className="total-proffys">
            <img src={smileIcon} alt="Emoji de sorriso" />
            <p className="total-proffys-text">Nós Temos {totalProffys} Proffys.</p>
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
        {teachers.map((teacher: any) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList

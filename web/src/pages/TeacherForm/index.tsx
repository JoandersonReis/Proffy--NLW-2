import React, { FormEvent, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import api from "../../services/api"

import Input from "../../components/Input"
import PageHeader from "../../components/PageHeader"
import Textarea from "../../components/Textarea"
import Select from "../../components/Select"
import defineStorageInfo from "../../utils/defineStorageInfo"

import warningIcon from "../../assets/images/icons/warning.svg"
import rocketIcon from "../../assets/images/icons/rocket.svg"

import "./styles.css"
import indenfyLogged from "../../utils/indenfyLogged"

function TeacherForm() {
  const history = useHistory()
  const [ scheduleItems, setScheduleItems ] = useState([{ week_day: 0, from: "", to: "" },])

  const [ whatsapp, setWhatsapp ] = useState("")
  const [ bio, setBio ] = useState("")
  const [ subject, setSubject ] = useState("")
  const [ cost, setCost ] = useState("")

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: "", to: ""}
    ])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api.post("classes", {
      user_id: defineStorageInfo("id"),
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(response => {
      history.push("/finished-register-class")
    }).catch(() => {
      alert("Erro no cadastro!")
    })
  }

  useEffect(() => {
    if(!indenfyLogged() || defineStorageInfo("proffy")) {
      history.push("/")
    }
  }, [])

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que íncrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
        sideComponent={
          <div className="next-proffy-container">
            <img src={rocketIcon} alt="Emoji de sorriso" />
            <p className="next-proffy-text">Prepare-se! <br/> Vai ser o máximo.</p>
          </div>
        }
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <div className="profile-content">
              <div className="profile">
                <img src={String(defineStorageInfo("avatar"))} alt="Imagem de perfil" />
                <span className="username">{defineStorageInfo("name")} {defineStorageInfo("lastname")}</span>
              </div>

              <div className="input-container">
                <label htmlFor="whatsapp">Whatsapp</label>

                <input
                  id="whatsapp"
                  name="whatsapp" 
                  value={whatsapp} 
                  onChange={(e) => setWhatsapp(e.target.value)}
                  type="text"
                  placeholder="(DDD) 9 9999-9999"
                  required
                />
              </div>
            </div>

            <Textarea 
              name="bio" 
              label="Biografia" 
              value={bio} 
              onChange={(e) => { setBio(e.target.value) }}
              required
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <div className="classes-container">
              <Select 
                name="subject" 
                label="Matéria"
                value={subject}
                onChange={(e) => { setSubject(e.target.value) }}
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

              <div className="input-container">
                <label htmlFor="cost">Custo da sua hora por aula</label>
                <input
                  type="text"
                  id="cost" 
                  name="cost" 
                  value={cost}
                  onChange={(e) => { setCost(e.target.value) }}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis

              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day" 
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
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
                  name="from" 
                  label="Das" 
                  type="time"
                  value={scheduleItem.from}
                  onChange={e => setScheduleItemValue(index, "from", e.target.value)}
                  required
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, "to", e.target.value)}
                  required
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar Cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm

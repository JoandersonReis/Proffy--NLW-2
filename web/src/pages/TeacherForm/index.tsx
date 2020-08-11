import React, { useState, FormEvent } from "react"
import { useHistory } from "react-router-dom"

import PageHeader from "../../components/PageHeader"
import Input from "../../components/Input"
import Textarea from "../../components/Textarea"
import Select from "../../components/Select"

import warningIcon from "../../assets/images/icons/warning.svg"

import "./styles.css"
import api from "../../services/api"

function TeacherForm() {
  const [ name, setName ] = useState("")
  const [ avatar, setAvatar ] = useState("")
  const [ whatsapp, setWhatsapp ] = useState("")
  const [ bio, setBio ] = useState("")
  const [ scheduleItems, setScheduleItems ] = useState([{ week_day: 0, from: "", to: ""}])

  const [ subject, setSubject ] = useState("")
  const [ cost, setCost ] = useState("")

  const history = useHistory()

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: ""}])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault()

    api.post("/classes", {
      name,
      avatar,
      bio,
      whatsapp,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      try {
        alert("Cadastro realizado com sucesso com sucesso")

        history.push("/")
      } catch(err) {
        alert("Erro no cadastro")
      }
    })
  }

  return (
    <div className="container" id="page-teacher-form">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição" 
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input 
              name="name" 
              label="Nome Completo" 
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar}
              onChange={event => setAvatar(event.target.value)}
            />
            <Input 
              name="whatsapp" 
              label="WhatsApp"
              value={whatsapp}
              onChange={event => setWhatsapp(event.target.value)} 
            />
            <Textarea 
              name="bio" 
              label="Biografia"
              value={bio}
              onChange={event => setBio(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a Aula</legend>

            <Select 
              name="subject" 
              label="Matéria"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
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
            <Input 
              name="cost" 
              label="Custo da sua aula"
              value={cost}
              onChange={(event) => setCost(event.target.value)} 
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={scheduleItem.week_day}>
                <Select 
                  name="week_day" 
                  label="Dia da Semana"
                  value={scheduleItem.week_day}
                  onChange={event => setScheduleItemValue(index, "week_day", event.target.value)}
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
                  onChange={event => setScheduleItemValue(index, "from", event.target.value)}
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time"
                  value={scheduleItem.to}
                  onChange={event => setScheduleItemValue(index, "to", event.target.value)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
import React, { FormEvent, useState } from "react"
import PageHeader from "../../components/PageHeader"
import { useHistory } from "react-router-dom"

import cameraIcon from "../../assets/images/icons/camera.svg"

import api from "../../services/api"
import Textarea from "../../components/Textarea"
import Select from "../../components/Select"
import Input from "../../components/Input"

import warningIcon from "../../assets/images/icons/warning.svg"

import "./styles.css"

function Profile() {
  const history = useHistory()
  const [ scheduleItems, setScheduleItems ] = useState([{ week_day: 0, from: "", to: "" },])

  const [ name, setName ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ avatar, setAvatar ] = useState("")
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
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(response => {
      alert("Cadastro realizado com sucesso")

      history.goBack()
    }).catch(() => {
      alert("Erro no cadastro!")
    })
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

  return (
    <div id="page-profile" className="container">
      <PageHeader>
        <div className="profile-header-content">
          <div className="profile-image-container">
            <img className="profile-image" src="https://avatars.githubusercontent.com/u/52385035?v=4" alt="Imagem de perfil" />
            <button type="button"><img src={cameraIcon} alt="Imagem de câmera" /></button>
          </div>
          <h2 className="profile-name">Joanderson Reis</h2>
          <p className="subject">Matemática</p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <div className="profile-content">
              <div className="input-container">
                <label htmlFor="name">Nome</label>

                <input
                  id="name"
                  name="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-container">
                <label htmlFor="lastname">Sobrenome</label>

                <input
                  id="lastname"
                  name="lastname" 
                  value={lastname} 
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div className="profile-content">
              <div className="input-container">
                <label htmlFor="email">E-mail</label>

                <input
                  id="email"
                  name="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
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
                />
              </div>
            </div>

            <Textarea 
              name="bio" 
              label="Biografia" 
              value={bio} 
              onChange={(e) => { setBio(e.target.value) }} 
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
                  { value: "Matemática", label: "Matemática" },
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
                />
                <Input 
                  name="to" 
                  label="Até" 
                  type="time"
                  value={scheduleItem.to}
                  onChange={e => setScheduleItemValue(index, "to", e.target.value)}
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

export default Profile

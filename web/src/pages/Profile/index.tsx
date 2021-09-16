import React, { FormEvent, useState, useEffect } from "react"
import PageHeader from "../../components/PageHeader"
import { useHistory } from "react-router-dom"

import api from "../../services/api"
import Textarea from "../../components/Textarea"
import Select from "../../components/Select"
import Input from "../../components/Input"
import DropZone from "../../components/DropZone"
import defineStorageInfo from "../../utils/defineStorageInfo"
import convertMinutesInHours from "../../utils/convertMinutesInHours"

import warningIcon from "../../assets/images/icons/warning.svg"

import "./styles.css"
import BoxMessage from "../../components/BoxMessage"
import indenfyLogged from "../../utils/indenfyLogged"

interface ScheduleProps {
  week_day: number,
  to: number,
  from: number
}

function Profile() {
  const history = useHistory()
  const userLocalStorage = window.localStorage
  const userSessionStorage = window.sessionStorage

  const [ selectedFile, setSelectedFile ] = useState<File>()
  const [ selectFileURL, setSelectedFileURL ] = useState("https://avatars.githubusercontent.com/u/52385035?v=4")
  const [ scheduleItems, setScheduleItems ] = useState([{ week_day: 0, from: "", to: "" }])
  const [ classId, setClassId ] = useState("")
  const [ modify, setModify ] = useState(0)
  const [ isError, setIsError ] = useState(false)

  const [ name, setName ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ whatsapp, setWhatsapp ] = useState("")
  const [ bio, setBio ] = useState("")

  const [ subject, setSubject ] = useState("")
  const [ cost, setCost ] = useState("")

  async function loadClasses() {
    const response = await api.get(`/classes/${defineStorageInfo("id")}`)

    setSubject(response.data.subject)
    setWhatsapp(response.data.whatsapp)
    setBio(response.data.bio)
    setCost(response.data.cost)
    setClassId(String(response.data.id))

    const schedulesData = response.data.schedules.map((schedule: ScheduleProps) => {
      return {
        week_day: schedule.week_day,
        to: convertMinutesInHours(schedule.to),
        from: convertMinutesInHours(schedule.from)
      }
    })
    setScheduleItems(schedulesData)
  }

  useEffect(() => {
    setName(String(defineStorageInfo("name")))
    setLastname(String(defineStorageInfo("lastname")))
    setSelectedFileURL(String(defineStorageInfo("avatar")))
    setEmail(String(defineStorageInfo("email")))

    loadClasses()

    if(!indenfyLogged()) {
      history.push("/")
    }
  }, [])

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: "", to: ""}
    ])
  }

  function handleDeleteScheduleItem(position: number) {
    const scheduleArray = scheduleItems

    scheduleItems.splice(position)

    setScheduleItems(scheduleArray)

    setModify(modify + 1)
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    const data = new FormData()

    data.append("name", name)
    data.append("lastname", lastname)
    data.append("id", String(classId))
    data.append("user_id", String(defineStorageInfo("id")))
    data.append("subject", subject)
    data.append("cost", cost)
    data.append("bio", bio)
    data.append("email", email)

    scheduleItems.forEach(schedule => {
      data.append("schedule", JSON.stringify(schedule))
    })

    if (selectedFile) {
      data.append("avatar", selectedFile)
    }


    const response = await api.put("classes", data)

    if(response.status == 201) {
      history.push("/finished-register-class")
      setIsError(false)

      if(userLocalStorage.getItem("avatar")) {
        userLocalStorage.setItem("avatar", selectFileURL)
        userLocalStorage.setItem("name", name)
      } else {
        userSessionStorage.setItem("avatar", selectFileURL)
        userSessionStorage.setItem("name", name)
      }
      
    } else {
      setIsError(true)
    }
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
      {isError && <BoxMessage text="Erro interno" seconds={2} />}
      <PageHeader>
        <div className="profile-header-content">
          <div className="profile-image-container">
            <img
              className="profile-image" 
              src={selectFileURL} 
              alt="Imagem de perfil" 
            />
            <DropZone onSelectedFile={setSelectedFile} onSelectedFileURL={setSelectedFileURL} />
          </div>
          <h2 className="profile-name">{name} {lastname}</h2>
          <p className="subject">{subject}</p>
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
                <button 
                  type="button" 
                  className="delete-schedule-button"
                  onClick={() => handleDeleteScheduleItem(index)}
                >-</button>
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

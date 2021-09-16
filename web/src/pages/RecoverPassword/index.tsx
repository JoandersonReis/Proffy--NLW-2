import React, { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"

import PageBanner from "../../components/PageBanner"

import backIcon from "../../assets/images/icons/back.svg"

import "./styles.css"
import api from "../../services/api"
import BoxMessage from "../../components/BoxMessage"
import indenfyLogged from "../../utils/indenfyLogged"

function RecoverPassword() {
  const { push } = useHistory()
  const userStorage = window.localStorage

  const [ email, setEmail ] = useState("")
  const [ buttonIsEnabled, setButtonIsEnabled ] = useState(false)
  const [ error, setError ] = useState("")
  const [ isError, setIsError ] = useState(false)

  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)

    let emailIsValid = email.split("").filter((string) => {
      return string === "@"
    })

    if(emailIsValid[0] == "@" && email.length > 8) {
      setButtonIsEnabled(true)
    } else {
      setButtonIsEnabled(false)
    }
  }

  async function handleSubmitEmail(e: FormEvent) {
    e.preventDefault()

    const response = await api.post("/reset-password", {
      to: email
    })

    if(response.status == 200) {
      userStorage.setItem("user_id", response.data.id)
      setIsError(false)

      alert("Um link para resetar sua senha foi enviado para seu endereço de email!")
      push("/")
    } else {
      setError(response.data.message)
      setIsError(true)
    }
  }

  useEffect(() => {
    if(!indenfyLogged()) {
      push("/")
    }
  }, [])

  return (
    <div id="page-recover-password-container">
      {isError && 
        <BoxMessage text={error} seconds={2} />
      }
      <div className="container">
        <main>
          <Link to="/"><img src={backIcon} alt="Voltar" /></Link>
          <form onSubmit={handleSubmitEmail}>
            <h2>Eita, Esqueceu sua senha?</h2>

            <p>Não esquenta, vamos dar um jeito nisso.</p>

            <input 
              value={email}
              type="email" 
              placeholder="E-mail"
              onChange={handleChangeEmail}
              required 
            />

            <button 
              type="submit" 
              className={buttonIsEnabled? "button finished":"button"} 
              disabled={buttonIsEnabled? false:true}
            >
              Enviar
            </button>
          </form>
        </main>

        <PageBanner />
      </div>
    </div>
  )
}

export default RecoverPassword

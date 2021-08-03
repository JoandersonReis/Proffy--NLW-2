import React, { ChangeEvent, FormEvent, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import PageBanner from "../../components/PageBanner"

import backIcon from "../../assets/images/icons/back.svg"

import "./styles.css"

function RecoverPassword() {
  const { push } = useHistory()

  const [ email, setEmail ] = useState("")
  const [ buttonIsEnabled, setButtonIsEnabled ] = useState(false)

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

  function handleSubmitEmail(e: FormEvent) {
    push("/finished-recover-password")
  }

  return (
    <div id="page-recover-password-container">
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

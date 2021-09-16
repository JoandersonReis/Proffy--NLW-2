import React, { FormEvent, useState, useEffect } from "react"
import { Link, useHistory, useRouteMatch } from "react-router-dom"

import PageBanner from "../../components/PageBanner"
import api from "../../services/api"

import backIcon from "../../assets/images/icons/back.svg"

import "./styles.css"
import indenfyLogged from "../../utils/indenfyLogged"

interface ParamsProps {
  token: string
}

function ChangePassword() {
  const { push } = useHistory()
  const routes = useRouteMatch()
  const userStorage = window.localStorage
  const params = routes.params as ParamsProps

  const [ password, setPassword ] = useState("")

  async function handleSubmitEmail(e: FormEvent) {
    e.preventDefault()

    console.log({
      id: Number(userStorage.getItem("user_id")),
      token: params.token,
      password
    })

    await api.put("/change-password", {
      id: Number(userStorage.getItem("user_id")),
      token: params.token,
      password
    })

    localStorage.clear()
    push("/finished-recover-password")
  }

  useEffect(() => {
    if(!indenfyLogged()) {
      push("/")
    }
  }, [])

  return (
    <div id="page-recover-password-container">
      <div className="container">
        <main>
          <Link to="/"><img src={backIcon} alt="Voltar" /></Link>
          <form onSubmit={handleSubmitEmail}>
            <h2>Redefina sua senha</h2>

            <p>Digite sua nova senha no campo abaixo!</p>

            <input 
              value={password}
              type="password"
              placeholder="Nova Senha"
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            <button 
              type="submit" 
              className="button finished"
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

export default ChangePassword

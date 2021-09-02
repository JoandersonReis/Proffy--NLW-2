import React, { FormEvent, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import PageBanner from "../../components/PageBanner"

import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"
import backIcon from "../../assets/images/icons/back.svg"

import "./styles.css"
import api from "../../services/api"

function Register() {
  const [ name, setName ] = useState("")
  const [ lastname, setLastame ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPasword ] = useState("")

  const [ showPassword, setShowPassword ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState()

  const { push } = useHistory()


  function handleShowPassword() {
    if(showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  async function handleSubmitRegister(e: FormEvent) {
    e.preventDefault()

    const response = await api.post("/users", {
      name,
      lastname,
      email,
      password
    })

    if(response.status == 202) {
      setErrorMessage(response.data.message)
    } else {
      push("/finished-register")
    }
  }

  return (
    <div id="page-register-container">
      <div className="container">
        <main>
        <Link to="/"><img src={backIcon} alt="Voltar" /></Link>
          <form onSubmit={handleSubmitRegister}>
            <h2>Cadastro</h2>
            <p>Preencha os dados abaixo para começar</p>
              <input 
                type="text" 
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
              <input 
                type="text"
                placeholder="Sobrenome"
                value={lastname}
                onChange={(e) => setLastame(e.target.value)}
                required 
              />
              <input 
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />

              <div className="input-container">
                <input 
                  type={showPassword? "text":"password"} 
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPasword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="show-password" 
                  onClick={handleShowPassword}
                > 
                  <img src={showPassword? hiddenPasswordIcon:showPasswordIcon} alt="Mostra senha" />
                </button>
              </div>

              <button type="submit" className="button">Concluir Cadastro</button>
          </form>
        </main>

        <PageBanner />
      </div>
    </div>
  )
}

export default Register

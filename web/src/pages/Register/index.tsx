import React, { useState } from "react"

import PageBanner from "../../components/PageBanner"

import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"
import "./styles.css"

function Register() {
  const [ showPassword, setShowPassword ] = useState(false)

  function handleShowPassword() {
    if(showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  return (
    <div id="page-register-container">
      <div className="container">
        <main>
          <form>
            <h2>Cadastro</h2>
            <p>Preencha os dados abaixo para começar</p>
              <input type="text" placeholder="Nome" required />
              <input type="text" placeholder="Sobrenome" required />
              <input type="email" placeholder="E-mail" required />

              <div className="input-container">
                <input type={showPassword? "text":"password"} placeholder="Senha" required />
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

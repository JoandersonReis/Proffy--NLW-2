import React, { useState } from "react"
import { Link } from "react-router-dom"

import "./styles.css"

import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"
import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"
import PageBanner from "../../components/PageBanner"

function Login() {
  const [ showPassword, setShowPassword ] = useState(false)

  function handleShowPassword() {
    if(showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  return (
    <div id="page-login-container">
      <div className="container">
        <PageBanner />

        <main>
          <form>
            <h2>Fazer Login</h2>
            <div className="input-container">
              <input type="email" placeholder="E-mail" required />
            </div>
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

            <div>
              <div className="remember-container">
                <input 
                  className="remember-checkbox" 
                  type="checkbox" id="remember" 
                  defaultChecked 
                />
                <label htmlFor="remember">Lembrar-me</label>
              </div>

              <a href="">Esqueci minha senha</a>
            </div>

            <button type="submit" className="button">Entrar</button>
          </form>
          
          <footer>
            <p>
              Não tem conta?<br/>
              <Link to="/register">Cadastre-se</Link>
            </p>

            <p>
              É de graça 
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </p>
          </footer>
        </main>

      </div>
    </div>
  )
}

export default Login

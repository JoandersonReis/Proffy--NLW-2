import React from "react"

import "./styles.css"
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"


function Login() {
  return (
    <div id="page-login-container">
      <div className="container">
        <aside>
          <div>
            <h1>Proffy</h1>
            <p>Sua plataforma de estudos online.</p>
          </div>
        </aside>
        
        <main>
          <form>
            <h2>Fazer Login</h2>
            <div className="input-container">
              <input type="email" placeholder="E-mail" required />
            </div>
            <div className="input-container">
              <input type="password" placeholder="Senha" required />
            </div>

            <div>
              <div className="remember-container">
                <input className="remember-checkbox" type="checkbox" id="remember" defaultChecked />
                <label htmlFor="remember">Lembrar-me</label>
              </div>

              <a href="">Esqueci minha senha</a>
            </div>

            <button type="submit" className="button">Entrar</button>
          </form>
          
          <footer>
            <p>
              Não tem conta?<br/>
              <a href="">Cadastre-se</a>
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

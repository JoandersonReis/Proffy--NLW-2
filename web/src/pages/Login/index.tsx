import React, { FormEvent, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"

import "./styles.css"

import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"
import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"
import PageBanner from "../../components/PageBanner"

import api from "../../services/api"
import BoxMessage from "../../components/BoxMessage"

function Login() {
  const [ showPassword, setShowPassword ] = useState(false)
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ isRemember, setIsRemember ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState<string>("")
  const [ isErrorMessage, setIsErrorMessage ] = useState(false)

  const [ isValid, setIsValid ] = useState(false)

  const userLocalStorage = window.localStorage
  const userSessionStorage = window.sessionStorage
  const history = useHistory()

  useEffect(() => {
    if(userLocalStorage.id) {
      history.push("/home")
    }
  }, [])

  function handleShowPassword() {
    if(showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  function filterUserInfo() {
    if(email.length > 8 && email.split("@").length > 1 && password.length >= 6) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const response = await api.post("/login", {
      email,
      password
    })

    if(response.status == 202) {
      setErrorMessage(response.data.message)
      setIsErrorMessage(false)
      setIsErrorMessage(true)
    }

    if(response.status == 200) {
      if(isRemember) {
        userLocalStorage.setItem("id", response.data.id)
        userLocalStorage.setItem("avatar", response.data.avatar)
        userLocalStorage.setItem("email", response.data.email)
        userLocalStorage.setItem("name", response.data.name)
        userLocalStorage.setItem("lastname", response.data.lastname)
        userLocalStorage.setItem("proffy", response.data.proffy)
      } else {
        userSessionStorage.setItem("id", response.data.id)
        userSessionStorage.setItem("avatar", response.data.avatar)
        userSessionStorage.setItem("email", response.data.email)
        userSessionStorage.setItem("name", response.data.name)
        userSessionStorage.setItem("lastname", response.data.lastname)
        userSessionStorage.setItem("proffy", response.data.proffy)
      }

      history.push("/home")
    }
  }

  return (
    <div id="page-login-container">
      {isErrorMessage && 
        <BoxMessage text={errorMessage} seconds={2} />
      }
      <div className="container">
        <PageBanner />

        <main>
          <form onSubmit={handleSubmit}>
            <h2>Fazer Login</h2>
            <div className="input-container">
              <input 
                type="email" 
                placeholder="E-mail" 
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  filterUserInfo()
                }}
              />
            </div>
            <div className="input-container">
              <input 
                type={showPassword? "text":"password"} 
                placeholder="Senha" 
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  filterUserInfo()
                }}
              />
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
                  onChange={(e) => setIsRemember(e.target.checked)}
                />
                <label htmlFor="remember">Lembrar-me</label>
              </div>

              <Link to="/recover-password">Esqueci minha senha</Link>
            </div>

            <button 
              type="submit" 
              className={isValid? "button finished":"button"} 
              disabled={isValid? false:true}
            >
              Entrar
            </button>
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

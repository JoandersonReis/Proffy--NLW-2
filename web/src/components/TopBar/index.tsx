import React from "react"
import { Link, useHistory } from "react-router-dom"

import defineStorageInfo from "../../utils/defineStorageInfo"

import logoutIcon from "../../assets/images/icons/logout.svg"
import "./styles.css"

function TopBar() {
  const userLocalStorage = window.localStorage
  const userSessionStorage = window.sessionStorage
  const history = useHistory()

  function handleLogout() {
    userLocalStorage.clear()
    userSessionStorage.clear()

    history.push("/")
  }

  return (
    <header className="top-bar-container">
      <Link to="/profile" className="profile">
        <img 
          src={String(defineStorageInfo("avatar"))} 
          alt="Imagem de perfil" 
        />
        
        {defineStorageInfo("name")} {defineStorageInfo("lastname")}
      </Link>

      <button type="button" onClick={handleLogout}><img src={logoutIcon} alt="Botão de sair" /></button>
    </header>
  )
}

export default TopBar

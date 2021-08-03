import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"

import "./styles.css"

import logoImg from "../../assets/images/logo.svg"
import landingImg from "../../assets/images/landing.svg"

import studyIcon from "../../assets/images/icons/study.svg"
import giveClassesIcon from "../../assets/images/icons/give-classes.svg"
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"
import logoutIcon from "../../assets/images/icons/logout.svg"


function Landing() {
  const [ totalConnections, setTotalConnections ] = useState(0)

  useEffect(() => {
    api.get("connections").then(response => {
      const { total } = response.data

      setTotalConnections(total)
    })
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <main>
          <header>
            <span className="profile">
              <img src="https://avatars.githubusercontent.com/u/52385035?v=4" alt="Imagem de perfil" />
              Joanderson Reis
            </span>

            <button type="button"><img src={logoutIcon} alt="Botão de sair" /></button>
          </header>

          <div className="logo-container">
            <img src={logoImg} alt="Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>

          <img 
            src={landingImg} 
            alt="Plataforma de estudos" 
            className="hero-image" 
          />
        </main>

        <footer>
          <p className="apresentation">Seja bem vindo. <br/> <span>O que deseja fazer?</span></p>

          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Dar Aulas" />
              Dar Aulas
            </Link>
          </div>

          <span className="total-connections">
            Total de {totalConnections} conexões ja realizadas 
            <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        </footer>
      </div>
    </div>
  )
}

export default Landing
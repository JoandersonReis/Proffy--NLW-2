import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"


import logoImg from "../../assets/images/logo.svg"
import landingImg from "../../assets/images/landing.svg"

import studyIcon from "../../assets/images/icons/study.svg"
import giveClassesIcon from "../../assets/images/icons/give-classes.svg"
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"


import api from "../../services/api"
import "./styles.css"
import TopBar from "../../components/TopBar"
import defineStorageInfo from "../../utils/defineStorageInfo"

function Landing() {
  const [ totalConnections, setTotalConnections ] = useState(0)

  const userLocalStorage = window.localStorage
  const userSessionStorage = window.sessionStorage
  const history = useHistory()

  useEffect(() => {
    api.get("connections").then(response => {
      const { total } = response.data

      setTotalConnections(total)
      
      if(userLocalStorage.length == 0 && userSessionStorage.length == 0) {
        history.push("/")
      }
    })
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <main>
          <TopBar />

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
            {Number(defineStorageInfo("proffy")) != 1?
              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar Aulas" />
                Dar Aulas
              </Link>:null
            }
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
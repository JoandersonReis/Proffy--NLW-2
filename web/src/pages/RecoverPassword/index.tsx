import React from "react"

import PageBanner from "../../components/PageBanner"

import backIcon from "../../assets/images/icons/back.svg"

import "./styles.css"
import { Link } from "react-router-dom"

function RecoverPassword() {
  return (
    <div id="page-recover-password-container">
      <div className="container">
        <main>
          <Link to="/"><img src={backIcon} alt="Voltar" /></Link>
          <form>
            <h2>Eita, Esqueceu sua senha?</h2>

            <p>Não esquenta, vamos dar um jeito nisso.</p>

            <input type="email" placeholder="E-mail" required />

            <button type="submit" className="button" disabled>Enviar</button>
          </form>
        </main>

        <PageBanner />
      </div>
    </div>
  )
}

export default RecoverPassword

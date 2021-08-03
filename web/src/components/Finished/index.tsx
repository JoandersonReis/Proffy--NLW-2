import React from "react"
import { Link } from "react-router-dom"

import successCheckIcon from "../../assets/images/icons/success-check-icon.svg"

import "./styles.css"

interface FinishedProps {
  title: string,
  description: string,
  buttonText: string,
  routePath: string
}

const Finished: React.FC<FinishedProps> = ({ title, description, buttonText, routePath }) => {
  return (
    <div id="finished-container">
      <main>
        <img src={successCheckIcon} alt="Icone de checagem" />
        <h1>{title}</h1>

        <p>{description}</p>

        <Link to={routePath}>{buttonText}</Link>
      </main>
    </div>
  )
}

export default Finished

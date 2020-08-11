import React from "react"

import { Link } from "react-router-dom"

import logoIcon from "../../assets/images/logo.svg"
import backIcon from "../../assets/images/icons/back.svg"

import "./styles.css"

interface Props {
  title: string,
  description?: string
}

const PageHeader: React.FC<Props> = ({title, children, description}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Botão de voltar"/>
        </Link>
        <img src={logoIcon} alt="Botão de voltar"/>
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        { description && <p>{description}</p> }
        {children}
      </div>
    </header>
  )
}

export default PageHeader

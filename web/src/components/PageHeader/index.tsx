import React, { ReactNode } from "react"
import { Link } from "react-router-dom"

import logoImg from "../../assets/images/logo.svg"
import backIcon from "../../assets/images/icons/back.svg"

import "./styles.css"

interface PageHeaderProps {
  title: string,
  description?: string
  sideComponent?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({title, children, description, sideComponent}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/home">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImg} alt="" />
      </div>

      <div className="header-content">
        <div className="side-component-container">
          <div>
            <strong>{title}</strong>
            { description && <p className="description">{description}</p> }
          </div>

          { sideComponent && sideComponent}    
        </div>

        {children}
      </div>
    </header>
  )
}

export default PageHeader
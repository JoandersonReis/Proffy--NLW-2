import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import Finished from "../../components/Finished"
import indenfyLogged from "../../utils/indenfyLogged"

function FinishedRegisterClasses() {
  const history = useHistory()

  useEffect(() => {
    if(!indenfyLogged()) {
      history.push("/")
    }
  }, [])

  return (
    <Finished 
      title="Cadastro salvo!" 
      description="Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp."
      buttonText="Acessar Lista"
      routePath="/study"   
    />
  )
}

export default FinishedRegisterClasses
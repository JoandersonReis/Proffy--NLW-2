import React from "react"

import Finished from "../../components/Finished"

function FinishedRegisterClasses() {
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
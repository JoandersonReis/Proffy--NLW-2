import React from "react"

import Finished from "../../components/Finished"

function FinishedRecoverPassword() {
  return (
    <Finished 
      title="Redefinição Enviada!" 
      description="Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos."
      buttonText="Fazer Login"
      routePath="/"   
    />
  )
}

export default FinishedRecoverPassword

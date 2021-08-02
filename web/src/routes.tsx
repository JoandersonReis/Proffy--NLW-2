import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import TeacherList from "./pages/TeacherList"
import TeacherForm from "./pages/TeacherForm"
import Login from "./pages/Login"
import Register from "./pages/Register"
import FinishedRegister from "./pages/FinishedRegister"

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/finished-register" component={FinishedRegister} />
    </BrowserRouter>
  )
}


export default Routes
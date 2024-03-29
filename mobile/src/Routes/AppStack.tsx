import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Landing from "../pages/Landing"
import GiveClasses from "../pages/GiveClasses"
import StudyTabs from "./StudyTabs"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Finished from "../pages/Finished"
import RecoverPassword from "../pages/RecoverPassword"
import Profile from "../pages/Profile"
import Wellcome from "../pages/Wellcome"

const { Navigator, Screen } = createStackNavigator()

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Wellcome" component={Wellcome} />
        <Screen name="Login" component={Login} />
        <Screen  name="Signup" component={Signup} />
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
        <Screen name="Finished" component={Finished} />
        <Screen name="RecoverPassword" component={RecoverPassword} />
        <Screen name="Profile" component={Profile} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack

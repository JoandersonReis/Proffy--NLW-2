import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"

import TeacherList from "../pages/TeacherList"
import Favorites from "../pages/Favorites"

const { Navigator, Screen } = createBottomTabNavigator()

function StudyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64
        },

        tabStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        },

        iconStyle: {
          flex: 0,
          height: 30,
          width: 30
        },

        labelStyle: {
          fontFamily: "Archivo Bold",
          fontSize: 13,
          marginLeft: 16
        },
        
        inactiveBackgroundColor: "#fafafc",
        activeBackgroundColor: "#ebebf5",
        inactiveTintColor: "#c1bccc",
        activeTintColor: "#32264d"
      }}
    >
      <Screen 
        name="TeacherList" 
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return <Icon name="ios-easel" color={focused? "#8257E5" : color} size={size} />
          }
        }}
      />
      <Screen 
        name="Favorites" 
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return <Icon name="ios-heart" color={focused? "#8257E5" : color} size={size} />
          }
        }} 
      />
    </Navigator>
  )
}

export default StudyTabs

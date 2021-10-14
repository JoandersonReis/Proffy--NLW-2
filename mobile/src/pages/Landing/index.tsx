import React, { useState, useEffect } from "react"
import { View, Text, Image } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import styles from "./styles"
import api from "../../services/api"

import landingImg from "../../assets/images/landing.png"
import studyIcon from "../../assets/images/icons/study.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import heartIcon from "../../assets/images/icons/heart.png"
import powerIcon from "../../assets/images/icons/power.png"
import { Alert } from "react-native"
import returnUserInfo from "../../utils/returnUserInfo"

function Landing() {
  const [ totalConnections, setTotalConnections ] = useState()
  const [ isProffy, setIsProffy ] = useState(false)

  const [ name, setName ] = useState("")
  const [ avatar, setAvatar ] = useState()

  const navigation = useNavigation()


  async function handleLogout() {
    await AsyncStorage.removeItem("user")

    navigation.navigate("Login")
  }

  async function loadUserInfo() {  
    setName(`${await returnUserInfo("name")} ${await returnUserInfo("lastname")}`)
    setAvatar(await returnUserInfo("avatar"))
  }

  async function verifyIsProffy() {
    if(await returnUserInfo("proffy") == 1) {
      setIsProffy(true)
    }
  }

  useEffect(() => {
    api.get("/connections").then(response => {
      setTotalConnections(response.data.total)
    })

    loadUserInfo()
  }, [])

  useFocusEffect(() => {
    verifyIsProffy()
  })

  return (
    <ScrollView>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <BorderlessButton 
            style={styles.profile} 
            onPress={() => navigation.navigate("Profile")}
            enabled={isProffy? true:false}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri: avatar
              }}
            />
            <Text style={styles.profileName}>{name}</Text>
          </BorderlessButton>

          <RectButton style={styles.logoutButton} onPress={handleLogout}>
            <Image source={powerIcon} resizeMode="contain" />
          </RectButton>
        </View>

        <Image source={landingImg} style={styles.banner} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>
          Seja bem vindo, {"\n"}

          <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            style={[styles.button, styles.buttonPrimary]} 
            onPress={() => navigation.navigate("Study")}
          >
            <Image source={studyIcon} />

            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>
          
          {!isProffy && 
            <RectButton 
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => navigation.navigate("GiveClasses")}
            >
              <Image source={giveClassesIcon} />

              <Text style={styles.buttonText}>Dar Aulas</Text>
            </RectButton>
          }
        </View>
        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas {" "}

          <Image source={heartIcon} />
        </Text>
      </View>
    </ScrollView>
  )
}

export default Landing 

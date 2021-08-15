import React, { useState, useEffect } from "react"
import { View, Text, Image } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

import styles from "./styles"
import api from "../../services/api"

import landingImg from "../../assets/images/landing.png"
import studyIcon from "../../assets/images/icons/study.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import heartIcon from "../../assets/images/icons/heart.png"
import powerIcon from "../../assets/images/icons/power.png"

function Landing() {
  const [ totalConnections, setTotalConnections ] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    api.get("/connections").then(response => {
      setTotalConnections(response.data.total)
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.topBar}>
          <BorderlessButton style={styles.profile}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://avatars.githubusercontent.com/u/52385035?v=4"
              }}
            />
            <Text style={styles.profileName}>Joanderson Reis</Text>
          </BorderlessButton>

          <RectButton style={styles.logoutButton} onPress={() => navigation.navigate("Login")}>
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

          <RectButton 
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => navigation.navigate("GiveClasses")}
          >
            <Image source={giveClassesIcon} />

            <Text style={styles.buttonText}>Dar Aulas</Text>
          </RectButton>
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

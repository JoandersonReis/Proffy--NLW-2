import React, { useState } from 'react'
import { View, Text, Image} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { RectButton } from "react-native-gesture-handler"
import { useFocusEffect } from "@react-navigation/native"

import styles from "./styles"
import landingImg from "../../assets/images/landing.png"
import studyIcon from "../../assets/images/icons/study.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import heartIcon from "../../assets/images/icons/heart.png"
import api from '../../services/api'

function Landing() {
  const navigation = useNavigation()

  const [ totalConnections, setTotalConnections ] = useState(0)

  useFocusEffect(() => {
    api.get("/connections").then(response => {
      setTotalConnections(response.data.total)
    })
  }, [])

  function handleNavigateToGiveClassesPage() {
    navigation.navigate("GiveClasses")
  }

  function handleNavigateToStudyTabsPages() {
    navigation.navigate("study")
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja Bem-vindo, {"\n"}

        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyTabsPages}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton 
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas! {" "}

        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing

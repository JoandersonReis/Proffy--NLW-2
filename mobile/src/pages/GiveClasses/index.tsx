import React from "react"
import { useNavigation } from "@react-navigation/native"
import { ImageBackground, Text, View } from "react-native"
import { RectButton } from "react-native-gesture-handler"

import styles from "./styles"

import giveClassesBgImage from "../../assets/images/give-classes-background.png"

function GiveClasses() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="contain" source={giveClassesBgImage} style={styles.content}>
        <Text style={styles.title}>Quer ser um Proffy?</Text>

        <Text style={styles.description}>Para começar, você precisa se cadastrar na nossa plataforma web</Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={() => navigation.goBack()}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses

import React from "react"
import { Image, Text, View, ImageBackground } from "react-native"

import logoIcon from "../../assets/images/icons/logo.png"
import backgroundImage from "../../assets/images/banner-background.png"

import styles from "./styles"

function Banner() {
  return (
    <View style={styles.container} >
      <ImageBackground style={styles.content} source={backgroundImage} resizeMode="contain">
        <View>
          <Image source={logoIcon} style={styles.logoImg} />
          <Text style={styles.description}>Sua plataforma de estudos online.</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Banner

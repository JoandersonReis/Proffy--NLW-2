import React from "react"
import { Image, ImageBackground, StatusBar, Text, View } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { RectButton } from "react-native-gesture-handler"

import backgroundImage from "../../assets/images/background-finished.png"
import checkedIcon from "../../assets/images/icons/checked.png"

import styles from "./styles"

interface ParamsProps {
  title: string,
  description: string,
  buttonText: string,
  screenPath: string
}

function Finished() {
  const { navigate } = useNavigation()
  const params = useRoute().params as ParamsProps

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9871F5" />
      <ImageBackground style={styles.content} source={backgroundImage} resizeMode="cover">
        <Image source={checkedIcon} />
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.description}>{params.description}</Text>
      </ImageBackground>

      <RectButton style={styles.finishedButton} onPress={() => navigate(params.screenPath)}>
        <Text style={styles.finishedButtonText}>{params.buttonText}</Text>
      </RectButton>
    </View>
  )
}

export default Finished

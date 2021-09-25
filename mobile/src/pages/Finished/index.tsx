import React from "react"
import { Image, ImageBackground, StatusBar, Text, View } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { RectButton } from "react-native-gesture-handler"

import backgroundImage from "../../assets/images/background-finished.png"
import checkedIcon from "../../assets/images/icons/checked.png"

import styles from "./styles"
import Button from "../../components/Button"

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
        
        <Button buttonBackgroundColor="#04D361" buttonText={params.buttonText} colorButtonText="#fff" onPress={() => navigate(params.screenPath)} />
      </ImageBackground>
    </View>
  )
}

export default Finished

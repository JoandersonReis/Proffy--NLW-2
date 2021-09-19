import React, { useState } from "react"
import { Image, ImageBackground, Text, View } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

import backgroundImg from "../../assets/images/background-wellcome.png"
import giveClassesIcon from "../../assets/images/icons/give-classes.png"
import studyIcon from "../../assets/images/icons/study.png"
import arrowRightIcon from "../../assets/images/icons/arrow-right.png"

import styles from "./styles"

function Wellcome() {
  const [ wellcomeStage, setWellcomeStage ] = useState(0)
  const { navigate } = useNavigation()

  function handleChangeStage() {
    if(wellcomeStage == 0) {
      setWellcomeStage(1)
    } else {
      navigate("Login")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground style={styles.bannerBackgroundImage} source={backgroundImg} resizeMode="contain">
          <Image style={styles.bannerIcon} source={wellcomeStage == 0? studyIcon:giveClassesIcon} resizeMode="contain" />
        </ImageBackground>
      </View>

      <View style={styles.content}>
        {wellcomeStage == 0?
          <>
            <Text style={styles.stageNumber}>01.</Text>

            <Text style={styles.description}>Encontre vários professores para ensinar você</Text>
          </>
          :
          <>
            <Text style={styles.stageNumber}>02.</Text>

            <Text style={styles.description}>Ou dê aulas sobre o que você mais conhece</Text>
          </>
        }

        <View style={styles.bottomBar}>
          <Text 
            style={[styles.stageIndicator, wellcomeStage == 0 && styles.indicatorSelected]}
          >
            . <Text style={[styles.stageIndicator, wellcomeStage == 1 && styles.indicatorSelected]}>.</Text>
          </Text>

          <BorderlessButton onPress={handleChangeStage} style={styles.nextButton}>
            <Image source={arrowRightIcon} resizeMode="contain" />
          </BorderlessButton>
        </View>
      </View>
    </View>
  )
}


export default Wellcome

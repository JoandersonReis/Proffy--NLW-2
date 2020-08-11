import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler' 
import { useNavigation } from '@react-navigation/native'

import styles from "./styles"
import giveClassesImg from "../../assets/images/give-classes-background.png"

export default function GiveClasses() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="contain" source={giveClassesImg} style={styles.content}>
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa que se cadastrar na nossa plataforma web.
        </Text>

      </ImageBackground>
      <RectButton onPress={() => navigation.goBack()} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo Bem</Text>
      </RectButton>
    </View>
  )
}

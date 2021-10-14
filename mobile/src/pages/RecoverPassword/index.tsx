import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, KeyboardAvoidingView, Text, View } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Input from "../../components/Input";

import arrowLeftIcon from "../../assets/images/icons/arrow-left.png"

import styles from './styles'
import api from "../../services/api";
import { Alert } from "react-native";


function RecoverPassword() {
  const [ email, setEmail ] = useState("")
  const [ isActived, setIsActived ] = useState(false)

  const { navigate, goBack } = useNavigation()

  async function handleNavigateToFinished() {
    const response = await api.post("/reset-password", {to: email.toLowerCase()})

    if(response.status == 200) {
      navigate("Finished", {
        title: "Redefinição Enviada!",
        description: "Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.",
        buttonText: "Voltar ao Login",
        screenPath: "Login"
      })
    } else {
      Alert.alert(response.data.message)
    }
  }

  function filterEmail() {
    if(email.length > 8 && email.split("@").length > 1) {
      setIsActived(true)
    } else {
      setIsActived(false)
    }
  }

  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container} behavior="position" keyboardVerticalOffset={-150}>
      <Banner />

      <View style={styles.content}>
        <BorderlessButton onPress={() => goBack()} >
          <Image source={arrowLeftIcon} resizeMode="contain" />
        </BorderlessButton>

        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Text style={styles.description}>Não esquenta,{"\n"} vamos dar um jeito nisso</Text>

        <Input 
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => {
            setEmail(text)
            filterEmail()
          }}
        />

        <Button 
          buttonBackgroundColor={isActived? "#04D361":"#DCDCE5"} 
          colorButtonText={isActived? "#fff":"#9C98A6"}
          buttonText="Enviar" 
          enabled={isActived? true:false} 
          onPress={handleNavigateToFinished} 
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default RecoverPassword

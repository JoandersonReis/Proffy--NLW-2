import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Input from "../../components/Input";

import arrowLeftIcon from "../../assets/images/icons/arrow-left.png"

import styles from './styles'

function RecoverPassword() {
  const { navigate, goBack } = useNavigation()

  function handleNavigateToFinished() {
    navigate("Finished", {
      title: "Redefinição Enviada!",
      description: "Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.",
      buttonText: "Voltar ao Login",
      screenPath: "Login"
    })
  }

  return (
    <View style={styles.container}>
      <Banner />

      <View style={styles.content}>
        <BorderlessButton onPress={() => goBack()} >
          <Image source={arrowLeftIcon} resizeMode="contain" />
        </BorderlessButton>

        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Text style={styles.description}>Não esquenta,{"\n"} vamos dar um jeito nisso</Text>

        <Input placeholder="E-mail" />

        <Button buttonText="Enviar" onPress={handleNavigateToFinished} />
      </View>
    </View>
  )
}

export default RecoverPassword

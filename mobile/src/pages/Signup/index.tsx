import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Image, KeyboardAvoidingView, StatusBar, Text, View } from "react-native"
import { BorderlessButton, RectButton } from "react-native-gesture-handler"

import backIcon from "../../assets/images/icons/back.png"
import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"

import FormSignup from "../../components/FormSignup"
import Input from "../../components/Input"

import styles from "./styles"

function Signup() {
  const [ showPassword, setShowPassword ] = useState(false)
  const [ currentStageSignup, setCurrentStageSignup ] = useState(0)
  const { goBack, navigate } = useNavigation()

  function handleChangeShowPassword() {
    showPassword? setShowPassword(false):setShowPassword(true)
  }

  function handleNavigateLogin() {
    navigate("Finished", {
      title: "Cadastro Concluído",
      description: "Agora você faz parte da plataforma da Proffy",
      buttonText: "Fazer Login",
      screenPath: "Login"
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E6E6F0" />
      <View style={styles.header}>
        <BorderlessButton onPress={() => goBack()}>
          <Image source={backIcon} style={styles.backButtonImg} />
        </BorderlessButton>

        <Text 
          style={currentStageSignup == 0? styles.rollingIndex:styles.rollingIndexWhite}
        >
          . <Text style={currentStageSignup == 1? styles.rollingIndex:styles.rollingIndexWhite} >.</Text>
          </Text>
      </View>

      <Text style={styles.title}>Crie sua conta gratuíta</Text>
      <Text style={styles.description}>Basta preencher esses dados e você estará conosco.</Text>


      {currentStageSignup == 0?
        <FormSignup title="01. Quem é você?" buttonText="Próximo" buttonColor="#8257E5" onPress={() => setCurrentStageSignup(1)}>
          <View>
            <Input placeholder="Nome" />
            <Input placeholder="Sobrenome" />
          </View>
        </FormSignup>
        :
        <FormSignup title="02. E-mail e Senha" buttonText="Concluir Cadastro" buttonColor="#04D361" onPress={handleNavigateLogin}>
          <View>
            <Input placeholder="Nome" />
            <Input placeholder="Senha" secureTextEntry={showPassword? false:true} >
              <RectButton style={styles.showPasswordButton} onPress={handleChangeShowPassword}>
                <Image style={styles.showPasswordImg} source={showPassword? hiddenPasswordIcon:showPasswordIcon} />
              </RectButton>
            </Input>
          </View>
        </FormSignup>
      }
      
    </View>
  )
}

export default Signup

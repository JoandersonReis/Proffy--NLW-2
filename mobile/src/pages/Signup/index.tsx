import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Image, StatusBar, Text, View, Alert, KeyboardAvoidingView } from "react-native"
import { BorderlessButton, RectButton } from "react-native-gesture-handler"

import arrowLeftIcon from "../../assets/images/icons/arrow-left.png"
import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"

import FormSignup from "../../components/FormSignup"
import Input from "../../components/Input"

import styles from "./styles"
import api from "../../services/api"

function Signup() {
  const { goBack, navigate } = useNavigation()

  const [ showPassword, setShowPassword ] = useState(false)
  const [ currentStageSignup, setCurrentStageSignup ] = useState(0)
  const [ name, setName ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  function handleBack() {
    if(currentStageSignup == 0) {
      goBack()
    } else {
      setCurrentStageSignup(0)
    }
  }

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

  async function handleRegisterUser() {
    if(email.length > 10 && password.length > 5) {
      const response = await api.post("/users", {
        name,
        lastname,
        email,
        password
      })

      if(response.status == 201) {
        handleNavigateLogin()
      } else if(response.status == 202) {
        Alert.alert(response.data.message)
      } 
    } else {
      Alert.alert("Email inválido ou senha menor que 6 caracteres!")
    }
  }

  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container} behavior="position" keyboardVerticalOffset={-100}>
      <StatusBar backgroundColor="#E6E6F0" />
      <View style={styles.header}>
        <BorderlessButton onPress={handleBack}>
          <Image source={arrowLeftIcon} style={styles.backButtonImg} />
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
            <Input 
              placeholder="Nome"
              value={name}
              onChangeText={text => setName(text)}
            />
            <Input 
              placeholder="Sobrenome"
              value={lastname}
              onChangeText={text => setLastname(text)}
            />
          </View>
        </FormSignup>
        :
        <FormSignup 
          title="02. E-mail e Senha" 
          buttonText="Concluir Cadastro" 
          buttonColor="#04D361" 
          onPress={handleRegisterUser}
        >
          <View>
            <Input 
              placeholder="E-mail" 
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Input 
              placeholder="Senha" 
              secureTextEntry={showPassword? false:true}
              autoCapitalize="none"
              value={password}
              onChangeText={text => setPassword(text)}
            >
              <RectButton style={styles.showPasswordButton} onPress={handleChangeShowPassword}>
                <Image style={styles.showPasswordImg} source={showPassword? hiddenPasswordIcon:showPasswordIcon} />
              </RectButton>
            </Input>
          </View>
        </FormSignup>
      }
      
    </KeyboardAvoidingView>
  )
}

export default Signup

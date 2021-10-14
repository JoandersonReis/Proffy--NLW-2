import React, { useState, useEffect } from "react"
import { Image, Text, View, KeyboardAvoidingView } from "react-native"
import { BorderlessButton, RectButton } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Banner from "../../components/Banner"
import CheckBox from "../../components/CheckBox"
import Input from "../../components/Input"
import Button from "../../components/Button"

import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"

import styles from "./styles"
import api from "../../services/api"
import { Alert } from "react-native"

function Login() {
  const [ remember, setRemember ] = useState(true)
  const [ showPassword, setShowPassword ] = useState(false)
  const [ isValid, setIsValid ] = useState(false)

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const { navigate } = useNavigation()

  function handleChangeShowPassword() {
    showPassword? setShowPassword(false):setShowPassword(true)
  }

  function filterUserInfo() {
    if(email.length > 8 && email.split("@").length > 1 && password.length >= 6) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  async function handleLogin() {
    const response = await api.post("/login", {
      email: email.toLowerCase(),
      password
    })

    if(response.status == 200) {
      if(remember) {
        await AsyncStorage.setItem("user", JSON.stringify([response.data]))

        navigate("Landing")
      } else {
        Alert.alert("Selecione Lembrar-me, 'Não lembrar' ainda esta em desenvolvimento")
      }

    } else if(response.status == 202) {
      Alert.alert(response.data.message)
    } 
  }

  async function verifyUserLogging() {
    const storage = await AsyncStorage.getItem("user")

    if(storage) {
      navigate("Landing")
    }
  }

  useEffect(() => {
    verifyUserLogging()
  }, [])

  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container} behavior="position" keyboardVerticalOffset={-140}>
      <Banner />
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.title}>Fazer Login</Text>
          <BorderlessButton onPress={() => navigate("Signup")}>
            <Text style={styles.createAccountButtonText}>Criar uma conta</Text>
          </BorderlessButton>
        </View>

        <Input 
          placeholder="E-mail"
          value={email}
          onChangeText={text => {
            setEmail(text)
            filterUserInfo()
          }} 
        />
        <Input 
          placeholder="Senha" 
          secureTextEntry={showPassword? false:true}
          value={password}
          autoCapitalize="none"
          onChangeText={text => {
            setPassword(text)
            filterUserInfo()
          }}
        >
          <RectButton style={styles.showPasswordButton} onPress={handleChangeShowPassword}>
            <Image style={styles.showPasswordImg} source={showPassword? hiddenPasswordIcon:showPasswordIcon} />
          </RectButton>
        </Input>

        <View style={styles.buttonsContainer}>
          <View style={styles.rememberContainer}>
            <CheckBox onChange={setRemember} checked={remember} />
            <Text style={styles.rememberText}>Lembrar-me</Text>
          </View>

          <BorderlessButton onPress={() => navigate("RecoverPassword")} >
            <Text style={styles.forgottenPasswordText}>Esqueci minha senha</Text>
          </BorderlessButton>
        </View>

        <Button 
          buttonText="Entrar" 
          buttonBackgroundColor={isValid? "#04D361":"#DCDCE5"} 
          colorButtonText={isValid? "#fff":"#9C98A6"}
          onPress={handleLogin}
          enabled={isValid? true:false}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

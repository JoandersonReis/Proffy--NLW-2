import React, { useState } from "react"
import { Image, Text, View, KeyboardAvoidingView } from "react-native"
import { BorderlessButton, RectButton } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

import Banner from "../../components/Banner"
import CheckBox from "../../components/CheckBox"
import Input from "../../components/Input"

import showPasswordIcon from "../../assets/images/icons/show-password.png"
import hiddenPasswordIcon from "../../assets/images/icons/hidden-password.png"

import styles from "./styles"

function Login() {
  const [ remember, setRemember ] = useState(true)
  const [ showPassword, setShowPassword ] = useState(false)

  const { navigate } = useNavigation()

  function handleChangeShowPassword() {
    showPassword? setShowPassword(false):setShowPassword(true)
  }

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

        <Input placeholder="E-mail" />
        <Input placeholder="Senha" secureTextEntry={showPassword? false:true} >
          <RectButton style={styles.showPasswordButton} onPress={handleChangeShowPassword}>
            <Image style={styles.showPasswordImg} source={showPassword? hiddenPasswordIcon:showPasswordIcon} />
          </RectButton>
        </Input>

        <View style={styles.buttonsContainer}>
          <View style={styles.rememberContainer}>
            <CheckBox onChange={setRemember} checked={remember} />
            <Text style={styles.rememberText}>Lembrar-me</Text>
          </View>

          <BorderlessButton>
            <Text style={styles.forgottenPasswordText}>Esqueci minha senha</Text>
          </BorderlessButton>
        </View>

        <RectButton style={[styles.buttonLogin]}>
          <Text style={[styles.buttonLoginText]}>Entrar</Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

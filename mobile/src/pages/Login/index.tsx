import React, { useState } from "react"
import { Text, TextInput, View,  } from "react-native"
import { BorderlessButton, RectButton } from "react-native-gesture-handler"
import Banner from "../../components/Banner"
import CheckBox from "../../components/CheckBox"

import styles from "./styles"

function Login() {
  const [ remember, setRemember ] = useState(true)

  return (
    <View style={styles.container}>
      <Banner />
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.title}>Fazer Login</Text>
          <BorderlessButton style={styles.createAccountButton}>
            <Text style={styles.createAccountButtonText}>Criar uma conta</Text>
          </BorderlessButton>
        </View>

        <TextInput style={styles.input} placeholder="E-mail"/>
        <TextInput style={styles.input}  secureTextEntry={true} placeholder="Senha"/>

        <View style={styles.buttonsContainer}>
          <View style={styles.rememberContainer}>
            <CheckBox onChange={setRemember} checked={remember} />
            <Text style={styles.rememberText}>Lembrar-me</Text>
          </View>

          <BorderlessButton><Text>Esqueci minha senha</Text></BorderlessButton>
        </View>

        <RectButton style={styles.buttonLogin}>
          <Text style={styles.buttonLoginText}>Entrar</Text>
        </RectButton>
      </View>
    </View>
  )
}

export default Login

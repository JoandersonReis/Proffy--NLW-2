import React from "react"
import { Text, View } from "react-native"
import { RectButton, RectButtonProperties } from "react-native-gesture-handler"

import Button from "../Button"

import styles from "./styles"

interface FormProps extends RectButtonProperties {
  title: string,
  buttonText: string,
  buttonColor: string
}

const FormSignup: React.FC<FormProps> = ({ title, buttonColor, buttonText, children, ...rest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}

      <Button buttonText={buttonText} buttonBackgroundColor={buttonColor} colorButtonText="#fff" {...rest} />
    </View>
  )
}

export default FormSignup

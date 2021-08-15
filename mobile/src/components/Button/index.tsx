import React from "react";
import { Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import styles from "./styles"

interface ButtonProps extends RectButtonProps {
  buttonBackgroundColor?: string,
  buttonText: string,
  colorButtonText?: string 
}

const Button: React.FC<ButtonProps> = ({ buttonBackgroundColor, buttonText, colorButtonText, ...rest }) => {
  return (
    <RectButton {...rest}
      style={[
        styles.container,
        buttonBackgroundColor? 
        {backgroundColor: buttonBackgroundColor}:null
    ]}>
      <Text 
        style={[styles.buttonText, colorButtonText?{color: colorButtonText}:null]}
      >
        {buttonText}
      </Text>
    </RectButton>
  )
}

export default Button

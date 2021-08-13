import React, { ReactNode, useState } from "react"
import { TextInput, View, TextInputProps } from "react-native"

import styles from "./styles"

const Input: React.FC<TextInputProps> = ({children, ...rest}) => {
  const [ isFocus, setIsFocus ] = useState(false)

  function handleChangeFocus() {
    isFocus? setIsFocus(false):setIsFocus(true)
  }

  return (
    <View style={styles.container}>
      { isFocus && <View style={styles.selected} /> }
      <TextInput style={styles.input} {...rest} onFocus={handleChangeFocus} onBlur={handleChangeFocus} placeholderTextColor="#9C98A6" />
      { children }
    </View>
  )
}


export default Input


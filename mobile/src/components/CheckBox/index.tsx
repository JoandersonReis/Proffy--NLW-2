import React, { useState } from "react"
import { Image } from "react-native"
import { RectButton } from "react-native-gesture-handler"

import checkIcon from "../../assets/images/icons/check.png"

import styles from "./styles"

interface CheckBoxProps {
  onChange: (checked: boolean) => void
  checked: boolean
}

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, checked }) => {
  const [ checkedState, setCheckedState ] = useState(checked)

  function handleCheckChange() {
    if(checked) {
      onChange(false)
    } else {
      onChange(true)
    }
  }

  return (
    checked? 
      <RectButton style={[styles.container, styles.checked]} onPress={handleCheckChange}>
        <Image source={checkIcon} />
      </RectButton>
      :
      <RectButton style={styles.container} onPress={handleCheckChange}></RectButton>
  )
}

export default CheckBox

import React, { useState, useEffect } from "react"
import { Text, View, StyleProp, ViewStyle, TextStyle } from "react-native"
import { RectButton, ScrollView } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Feather"

import styles from "./styles"

interface StylesProps {
  container?: StyleProp<ViewStyle>,
  toggleButton?: StyleProp<ViewStyle>,
  toggleButtonText?: StyleProp<TextStyle>,
  menu?: StyleProp<ViewStyle>,
  menuItem?: StyleProp<ViewStyle>,
  itemSelected?: StyleProp<ViewStyle>,
  itemSelectedText?: StyleProp<TextStyle>,
}

interface ItemProps {
  label: string,
  value: string|number|null
}

interface PickerProps {
  items: Array<ItemProps>,
  onChangeValue?: (item: string|number|null) => void,
  placeholder?: string,
  placeholderColor?: string,
  defaultValue?: ItemProps,
  iconColor?: string,
  style?: StylesProps
}

const Picker: React.FC<PickerProps> = ({ items, onChangeValue, defaultValue, placeholderColor, placeholder, iconColor, style }) => {
  const [ isActiveMenu, setIsActiveMenu ] = useState(false)
  const [ itemSelected, setItemSelected ] = useState<ItemProps>(defaultValue? defaultValue:{label: placeholder? placeholder:"Selecione", value: null})


  function handleActiveToggleMenu() {
    isActiveMenu? setIsActiveMenu(false):setIsActiveMenu(true)
  }

  function handleChangeItemSelected(item: ItemProps) {
    setItemSelected(item)
    onChangeValue && onChangeValue(item.value);

    handleActiveToggleMenu()
  }

  return (
    <View style={[styles.container, style?.container]}>
      <RectButton 
        style={[styles.toggleButton, style?.toggleButton]} 
        onPress={handleActiveToggleMenu} 
      >
        <Text style={[styles.toggleButtonText, style?.toggleButtonText, placeholderColor? {color: placeholderColor}:null]}>
          {itemSelected.label}
        </Text>
        
        <Icon name={isActiveMenu? "chevron-up":"chevron-down"} color={iconColor? iconColor:"#6A6180"} size={15} />
      </RectButton>

      <ScrollView style={[styles.menu, style?.menu]}>
        {isActiveMenu &&
          items.map((item) => (
            <RectButton
              key={item.value}
              onPress={() => handleChangeItemSelected(item)}
              style={[styles.menuItem, style?.itemSelected, item.value == defaultValue?.value? styles.itemSelected:null]} 
            >
              <Text style={[styles.menuItemText, style?.itemSelectedText, item.value == defaultValue?.value? styles.itemSelectedText:null]}>
                {item.label}
              </Text>
            </RectButton>
          ))
        }
      </ScrollView>
    </View>
  )
}


export default Picker

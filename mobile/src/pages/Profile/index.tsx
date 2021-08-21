import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Image, ImageBackground, Text, TextInput, View } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Feather"

import Picker from "../../components/Picker"

import backgroundProfileImage from "../../assets/images/background-profile.png"

import styles from "./styles"
import { Alert } from "react-native"

interface ScheduleItemProps {
  weekDay: string,
  from: string,
  to: string
}

function Profile() {
  const [ scheduleItems, setScheduleItems ] = useState<ScheduleItemProps[]>([{weekDay: "", from: "", to: ""}])
  const navigation = useNavigation()

  function handleAddScheduleItem() {
    setScheduleItems([...scheduleItems, {weekDay: "", from: "", to: ""}])
  }

  function handleEditScheduleItem(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  function handleDeleteScheduleItem(position: number) {
    let updatedScheduleItems = scheduleItems

    updatedScheduleItems.splice(position, 1)
    
    setScheduleItems(updatedScheduleItems)
    console.log(scheduleItems)
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <ImageBackground style={styles.profileContainer} source={backgroundProfileImage} resizeMode="contain">
          <Image style={styles.profileImage} source={{uri: "https://avatars.githubusercontent.com/u/52385035?v=4"}} />
          <Text style={styles.profileName}>Joanderson Reis</Text>
          <Text style={styles.subject}>Matemática</Text>
        </ImageBackground>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Seus Dados</Text>
          </View>

          <View>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>Sobrenome</Text>
            <TextInput style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>Biografia</Text>
            <TextInput 
              style={[styles.input, styles.bio]}
              multiline={true}
              numberOfLines={15}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sobre a aula</Text>
          </View>

          <View>
            <Text style={styles.label}>Matéria</Text>
            <TextInput style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>Custo da sua hora por aula</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.titleTimeContainer}>
            <Text style={styles.title}>Horários Disponíveis</Text>
            <BorderlessButton onPress={handleAddScheduleItem}>
              <Text style={styles.addNewClassButtonText}>+ Novo</Text>
            </BorderlessButton>
          </View>

          {scheduleItems.map((item, index) => (  
            <View key={index} style={index == 1? styles.scheduleBlock:null}>
              <Text style={styles.label}>Dia da Semana</Text>
              <Picker
                onChangeValue={(text) => handleEditScheduleItem(index, "weekDay", String(text))}
                defaultValue={item.weekDay}
                style={{
                  toggleButton: {
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#E6E6F0",
                  }
                }}
                items={[
                  { label: "Domingo", value: "Domingo" },
                  { label: "Segunda-Feira", value: "Segunda" },
                  { label: "Terça-Feira", value: "Terça" },
                  { label: "Quarta-Feira", value: "Quarta" },
                  { label: "Quinta-Feira", value: "Quinta" },
                  { label: "Sexta-Feira", value: "Sexta" },
                  { label: "Sábado", value: "Sábado" },
                ]} 
              />

              <View style={styles.timeContainer}>
                <View style={styles.inputTimeBlock}>
                  <Text style={styles.label}>Das</Text>
                  <TextInput 
                    style={styles.input}
                    value={item.from}
                    onChangeText={(text) => handleEditScheduleItem(index, "from", text)} 
                  />
                </View>

                <View style={styles.inputTimeBlock}>
                  <Text style={styles.label}>Até</Text>
                  <TextInput 
                    style={styles.input}
                    value={item.to}
                    onChangeText={(text) => handleEditScheduleItem(index, "to", text)}
                  />
                </View>
              </View>
              {index > 0 && 
                <View style={styles.deleteClassContainer}>
                  <View style={styles.lineDeleteClassButton} />

                  <BorderlessButton onPress={() => handleDeleteScheduleItem(index)}>
                    <Text style={styles.deleteClassButtonText}>Excluir Horário</Text>
                  </BorderlessButton>
                  
                  <View style={styles.lineDeleteClassButton} />
                </View>
              }
            </View>
          ))}

        </View>

        <View style={styles.footer}>
          <RectButton style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Salvar Cadastro</Text>
          </RectButton>

          <View style={styles.warning}>
            <Icon name="alert-octagon" color="#8257E5" size={36} />
            <Text style={styles.warningTextStrong}>
              Importante! {"\n"}
              <Text style={styles.warningText}>Preencha Todos os campos</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile
import React, { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Image, Text, TextInput, View } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Feather"

import PageHeader from "../../components/PageHeader"
import Picker from "../../components/Picker"

import returnUserInfo from "../../utils/returnUserInfo"
import api from "../../services/api"

import styles from "./styles"
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ScheduleItemProps {
  week_day: string,
  from: string,
  to: string
}

function GiveClasses() {
  const [ scheduleItems, setScheduleItems ] = useState<ScheduleItemProps[]>([{week_day: "", from: "", to: ""}])
  const navigation = useNavigation()

  const [ name, setName ] = useState("")
  const [ avatar, setAvatar ] = useState()
  const [ whatsapp, setWhatsapp] = useState("")
  const [ bio, setBio ] = useState("")
  const [ subject, setSubject ] = useState<string|null|number>("")
  const [ cost, setCost ] = useState("0")
  const [ user_id, setUserId ] = useState("")


  async function loadUserInfo() {
    setName(`${await returnUserInfo("name")} ${await returnUserInfo("lastname")}`)
    setAvatar(await returnUserInfo("avatar"))
    setUserId(await returnUserInfo("id"))
  }

  function handleAddScheduleItem() {
    setScheduleItems([...scheduleItems, {week_day: "", from: "", to: ""}])
  }

  function handleEditScheduleItem(position: number, field: string, value: string|number) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  async function handleCreateClass() {
    try {
      const response = await api.post("/classes", {
        user_id,
        subject,
        bio,
        whatsapp: String(whatsapp),
        cost: Number(cost),
        schedule: scheduleItems
      })
  
      if(response.status == 201) {
        const user = await AsyncStorage.getItem("user")
        let userArray = JSON.parse(String(user))
    
        userArray[0].proffy = 1
        await AsyncStorage.setItem("user", JSON.stringify(userArray))
  
        navigation.navigate("Finished", {
          title: "Cadastro Salvo",
          description: "Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.",
          buttonText: "Inicio",
          screenPath: "Landing"
        })
      } else {
        Alert.alert("Erro Inesperado")
      }
    } catch(err) {
      Alert.alert("Preencha Todos os campos")
    }
  } 

  useEffect(() => {
    loadUserInfo()

    returnUserInfo("proffy").then(response => {
      if(response == 1) {
        Alert.alert("Você ja tem uma aula cadastrada!")
        navigation.goBack()
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <PageHeader title="Que incrível que você quer dar aulas" >
        <Text style={styles.description}>O primeiro passo, é preencher esse formulário de inscrição.</Text>
      </PageHeader>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Seus Dados</Text>
          </View>

          <View style={styles.profileContainer}>
            <Image 
              style={styles.profileImage} 
              source={{uri: avatar}} 
            />

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{name}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput 
              style={styles.input}
              value={whatsapp}
              onChangeText={setWhatsapp}
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Text style={styles.label}>Biografia</Text>
            <TextInput 
              style={[styles.input, styles.bio]}
              multiline={true}
              numberOfLines={15}
              value={bio}
              textAlignVertical="top"
              onChangeText={setBio} 
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sobre a aula</Text>
          </View>

          <View>
            <Text style={styles.label}>Matéria</Text>
            <Picker
              onChangeValue={setSubject}
              defaultValue={subject}
              items={[
                { label: "Matemática", value: "Matemática" },
                { label: "Português", value: "Português" },
                { label: "Ciências", value: "Ciências" },
                { label: "História", value: "História" },
                { label: "Geografia", value: "Geografia" },
                { label: "Física", value: "Física" },
                { label: "Química", value: "Química" },
                { label: "Biologia", value: "Biologia" },
                { label: "Sociologia", value: "Sociologia" },
                { label: "Filosofia", value: "Filosofia" },
                { label: "Ed. Física", value: "Ed. Física" },
                { label: "Inglês", value: "Inglês" },
              ]}
            />    
          </View>

          <View>
            <Text style={styles.label}>Custo da sua hora por aula</Text>
            <TextInput
              style={styles.input}
              value={cost}
              keyboardType="numeric"
              onChangeText={setCost} 
            />
          </View>

          <View style={styles.titleTimeContainer}>
            <Text style={styles.title}>Horários Disponíveis</Text>
            <BorderlessButton onPress={handleAddScheduleItem}>
              <Text style={styles.addNewClassButtonText}>+ Novo</Text>
            </BorderlessButton>
          </View>

          {scheduleItems.map((item, index) => (  
            <View key={index} style={index > 0? styles.scheduleBlock:null}>
              <Text style={styles.label}>Dia da Semana</Text>
              <Picker
                onChangeValue={(text) => handleEditScheduleItem(index, "week_day", Number(text))}
                defaultValue={item.week_day}
                style={{
                  toggleButton: {
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#E6E6F0",
                  }
                }}
                items={[
                  { label: "Domingo", value: "0" },
                  { label: "Segunda-Feira", value: "1" },
                  { label: "Terça-Feira", value: "2" },
                  { label: "Quarta-Feira", value: "3" },
                  { label: "Quinta-Feira", value: "4" },
                  { label: "Sexta-Feira", value: "5" },
                  { label: "Sábado", value: "6" },
                ]} 
              />

              <View style={styles.timeContainer}>
                <View style={styles.inputTimeBlock}>
                  <Text style={styles.label}>Dás</Text>
                  <Picker
                    onChangeValue={(text) => handleEditScheduleItem(index, "from", String(text))}
                    defaultValue={item.from}
                    items={[
                      { label: "06:00", value: "6:00" },
                      { label: "07:00", value: "7:00" },
                      { label: "08:00", value: "8:00" },
                      { label: "09:00", value: "9:00" },
                      { label: "10:00", value: "10:00" },
                      { label: "11:00", value: "11:00" },
                      { label: "12:00", value: "12:00" },
                      { label: "13:00", value: "13:00" },
                      { label: "14:00", value: "14:00" },
                      { label: "15:00", value: "15:00" },
                      { label: "16:00", value: "16:00" },
                      { label: "17:00", value: "17:00" },
                      { label: "18:00", value: "18:00" },
                      { label: "19:00", value: "19:00" },
                      { label: "20:00", value: "20:00" },
                      { label: "21:00", value: "21:00" },
                      { label: "22:00", value: "22:00" },
                      { label: "23:00", value: "23:00" },
                    ]}
                  />
                </View>

                <View style={styles.inputTimeBlock}>
                  <Text style={styles.label}>Até</Text>
                  <Picker
                    onChangeValue={(text) => handleEditScheduleItem(index, "to", String(text))}
                    defaultValue={item.to}
                    items={[
                      { label: "06:00", value: "6:00" },
                      { label: "07:00", value: "7:00" },
                      { label: "08:00", value: "8:00" },
                      { label: "09:00", value: "9:00" },
                      { label: "10:00", value: "10:00" },
                      { label: "11:00", value: "11:00" },
                      { label: "12:00", value: "12:00" },
                      { label: "13:00", value: "13:00" },
                      { label: "14:00", value: "14:00" },
                      { label: "15:00", value: "15:00" },
                      { label: "16:00", value: "16:00" },
                      { label: "17:00", value: "17:00" },
                      { label: "18:00", value: "18:00" },
                      { label: "19:00", value: "19:00" },
                      { label: "20:00", value: "20:00" },
                      { label: "21:00", value: "21:00" },
                      { label: "22:00", value: "22:00" },
                      { label: "23:00", value: "23:00" },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <RectButton 
            style={styles.registerButton} 
            onPress={handleCreateClass}
          >
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

export default GiveClasses

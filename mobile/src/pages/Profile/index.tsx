import React, { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Image, ImageBackground, Text, TextInput, View } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import { launchImageLibrary, ImageLibraryOptions, launchCamera, CameraOptions } from "react-native-image-picker"
import Icon from "react-native-vector-icons/Feather"

import Picker from "../../components/Picker"

import backgroundProfileImage from "../../assets/images/background-profile.png"

import styles from "./styles"
import { Alert } from "react-native"
import api from "../../services/api"
import convertMinutesInHours from "../../utils/convertMinutesInHours"
import AsyncStorage from "@react-native-async-storage/async-storage"
import convertNumberDay from "../../utils/convertNumberInWeekDay"

interface ScheduleItemProps {
  week_day: string,
  from: string,
  to: string
}

interface ScheduleProps {
  week_day: number,
  to: number,
  from: number
}

interface ClassesProps {
  id: number,
  user_id: number,
  bio: string,
  subject: string,
  schedules: Array<ScheduleProps>,
  cost: number,
  whatsapp: string
}

function Profile() {
  const [ scheduleItems, setScheduleItems ] = useState<ScheduleItemProps[]>([{week_day: "", from: "", to: ""}])
  const [ countDelete, setCountDelete ] = useState(0)
  
  const [ name, setName ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ whatsapp, setWhatsapp] = useState("")
  const [ bio, setBio ] = useState("")
  const [ subject, setSubject ] = useState<string|number|null>("")
  const [ cost, setCost ] = useState("0")
  const [ user_id, setUserId ] = useState("")
  const [ classId, setClassId ] = useState("")
  const [ isProffy, setIsProffy ] = useState(0)
  const [ countUpdate, setCountUpdate ] = useState(0)

  const [ imageUri, setImageUri ] = useState("")
  const [ selectedFile, setSelectedFile ] = useState<Blob>()

  const navigation = useNavigation()

  async function loadClasses() {
    const storage = await AsyncStorage.getItem("user")
    const [data] = JSON.parse(String(storage))

    setUserId(data.id)
    setIsProffy(data.proffy)
    setName(data.name)
    setLastname(data.lastname)
    setEmail(data.email)
    setImageUri(data.avatar)

    const response = await api.get(`/classes/${user_id}`)

    const result = response.data as ClassesProps
    
    setWhatsapp(result.whatsapp)
    setBio(result.bio)
    setCost(String(result.cost))
    setClassId(String(result.id))
    setSubject(result.subject)


    
    setSubject(String(result.subject))
    if(result.schedules) {
      const schedulesData = result.schedules.map((schedule: ScheduleProps) => {
        return {
          week_day: String(schedule.week_day),
          to: String(convertMinutesInHours(schedule.to)),
          from: String(convertMinutesInHours(schedule.from))
        }
      })

      setScheduleItems(schedulesData)
    }

    if(!result.schedules) {
      setCountUpdate(countUpdate + 1)
    }
  }

  function getImageProfile() {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 1,
      includeBase64: true,
    }

    launchImageLibrary(options, ({ assets }) => {
      if(assets) {
        setImageUri(String(assets[0].uri))
        
        const blob = new Blob([String(assets[0].base64)], {
          type: String(assets[0].type),
          lastModified: new Date().getTime(),
        })

        setSelectedFile(blob)
      }
    })
  }

  function takePicture() {
    const options: CameraOptions = {
    mediaType: "photo",
    quality: 1,
    cameraType: "front",
    includeBase64: true,
    }

    launchCamera(options, async ({assets}) => {
      if(assets) {
        setImageUri(String(assets[0].uri))

        const blob = new Blob([String(assets[0].base64)], {
          type: String(assets[0].type),
          lastModified: new Date().getTime(),
        })

        setSelectedFile(blob)
      }
    })
  }

  useEffect(() => {
    loadClasses()
  }, [countUpdate])

  function handleAddScheduleItem() {
    setScheduleItems([...scheduleItems, {week_day: "", from: "", to: ""}])
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
    setCountDelete(countDelete + 1)
  }

  async function handleSubmit() {
    const data = new FormData()

    data.append("name", name)
    data.append("lastname", lastname)
    data.append("id", String(classId))
    data.append("user_id", String(user_id))
    data.append("bio", bio)
    data.append("email", email)
    data.append("whatsapp", whatsapp)

    if(subject && cost && scheduleItems) {
      data.append("subject", subject)
      data.append("cost", cost)
      data.append("schedule", JSON.stringify(scheduleItems))
    }

    if (selectedFile) {
      data.append("avatar", selectedFile)
    }

    const response = await api.put("classes", data)

    if(response.status == 201) {
      navigation.navigate("Finished", {
        title: "Cadastro Salvo!",
        description: "Tudo certo, seu cadastro está na nossa lista de professores. Agora é ó ficar de olho no seu WhatsApp.",
        buttonText: "Lista",
        screenPath: "Study"
      })

      const data = [{
        avatar: imageUri,
        id: user_id,
        proffy: isProffy,
        email,
        name,
        lastname
      }]

      await AsyncStorage.setItem("user", JSON.stringify(data))
      
    } else {
      Alert.alert("Preencha todos os campos")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground style={styles.profileContainer} source={backgroundProfileImage} resizeMode="contain">
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={{uri: imageUri? imageUri:`http://192.168.1.102:3333/uploads/default.png`}} />
            <RectButton onPress={takePicture} style={[styles.changeProfileImageButton, styles.takePictureProfile]}>
              <Icon name="camera" color="#fff" size={15} />
            </RectButton>

            <RectButton 
              style={styles.changeProfileImageButton}
              onPress={getImageProfile}
            >
              <Icon name="edit-2" color="#fff" size={20} />
            </RectButton>
          </View>
          <Text style={styles.profileName}>{name} {lastname}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </ImageBackground>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Seus Dados</Text>
          </View>

          <View>
            <Text style={styles.label}>Nome</Text>
            <TextInput 
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text style={styles.label}>Sobrenome</Text>
            <TextInput 
              style={styles.input}
              value={lastname}
              onChangeText={setLastname}
            />
          </View>

          <View>
            <Text style={styles.label}>E-mail</Text>
            <TextInput 
              style={styles.input}
              value={email}
              onChangeText={setEmail} 
            />
          </View>

          <View>
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput 
              style={styles.input}
              value={whatsapp}
              onChangeText={setWhatsapp} 
            />
          </View>

          <View>
            <Text style={styles.label}>Biografia</Text>
            <TextInput 
              style={[styles.input, styles.bio]}
              multiline={true}
              numberOfLines={15}
              textAlignVertical="top"
              value={bio}
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
              defaultValue={{label: String(subject), value: String(subject)}}
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
              onChangeText={setCost}
              keyboardType="numeric"
            />
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
                onChangeValue={(text) => handleEditScheduleItem(index, "week_day", String(text))}
                defaultValue={{label: convertNumberDay(Number(item.week_day)), value: item.week_day}}
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
                  <Text style={styles.label}>Das</Text>
                  <Picker
                    onChangeValue={(text) => handleEditScheduleItem(index, "from", String(text))}
                    defaultValue={{label: item.from, value: item.from}}
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
                    defaultValue={{label: item.to, value: item.to}}
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
          <RectButton style={styles.registerButton} onPress={handleSubmit}>
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

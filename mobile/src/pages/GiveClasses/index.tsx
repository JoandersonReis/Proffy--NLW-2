import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Image, Text, TextInput, View } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Feather"

import PageHeader from "../../components/PageHeader"
import Picker from "../../components/Picker"

import styles from "./styles"

interface ScheduleItemProps {
  weekDay: string,
  from: string,
  to: string
}

function GiveClasses() {
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
              source={{uri: "https://avatars.githubusercontent.com/u/52385035?v=4"}} 
            />

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Joanderson Reis</Text>
              <Text style={styles.subject}>Matemática</Text>
            </View>
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
            <View key={index} style={index > 0? styles.scheduleBlock:null}>
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
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <RectButton 
            style={styles.registerButton} 
            onPress={() => {
              navigation.navigate("Finished", {
                title: "Cadastro Salvo",
                description: "Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.",
                buttonText: "Fazer Login",
                screenPath: "Login"
              })
            }}>
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

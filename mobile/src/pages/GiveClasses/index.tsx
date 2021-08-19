import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Alert, Image, Text, TextInput, View } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Feather"

import PageHeader from "../../components/PageHeader"
import Picker from "../../components/Picker"

import styles from "./styles"

function GiveClasses() {
  const [ weekDay, setWeekDay ] = useState<number|string|null>("")
  const navigation = useNavigation()

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

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Whatsapp</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.inputBlock}>
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

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Custo da sua hora por aula</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.titleTimeContainer}>
            <Text style={styles.title}>Horários Disponíveis</Text>
            <BorderlessButton>
              <Text style={styles.addNewClassButtonText}>+ Novo</Text>
            </BorderlessButton>
          </View>

          <View>
            <Text style={styles.label}>Dia da Semana</Text>
            <Picker
              onChangeValue={setWeekDay}
              defaultValue={weekDay}
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
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.inputTimeBlock}>
              <Text style={styles.label}>Das</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inputTimeBlock}>
              <Text style={styles.label}>Até</Text>
              <TextInput style={styles.input} />
            </View>
          </View>
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

export default GiveClasses

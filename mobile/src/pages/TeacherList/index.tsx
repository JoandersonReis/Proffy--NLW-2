import React, { useState } from "react"
import { ScrollView, View, TextInput, Text, Image, Alert } from "react-native"
import PageHeader from "../../components/PageHeader"
import { RectButton } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Feather"
import AsyncStorage from "@react-native-async-storage/async-storage"
import RNPickerSelect from 'react-native-picker-select';

import api from "../../services/api"
import TeacherItem from "../../components/TeacherItem"

import smileIcon from "../../assets/images/icons/smile.png"

import styles from "./styles"

export interface TeachersProps {
  id: number,
  subject: string,
  cost: number,
  name: string,
  bio: string,
  user_id: number,
  whatsapp: string,
  avatar: string
}

function TeacherList() {
  const [ isFiltersVisible, setIsFiltersVisible ] = useState(false)
  const [ teachers, setTeachers ] = useState([])
  const [ favorites, setFavorites ] = useState<number[]>([])

  const [ subject, setSubject ] = useState("Selecione")
  const [ weekDay, setWeekDay ] = useState("Selecione")
  const [ time, setTime ] = useState("Selecione")

  function toggleSearchForm() {
    if(isFiltersVisible) {
      setIsFiltersVisible(false)
    } else {
      setIsFiltersVisible(true)
    }
  }

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((teacher: TeachersProps) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersIds)
      }
    })
  }

  async function searchTeachers() {
    loadFavorites()

    const response = await api.get("/classes", {
      params: {
        subject,
        week_day: Number(weekDay),
        time
      }
    })

    setIsFiltersVisible(false)
    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={
          <View style={styles.totalProffys}>
            <Image source={smileIcon} resizeMode="contain" />
            <Text style={styles.totalProffysText}>32 Proffys</Text>
          </View>
        }>
        <View style={styles.toggleButtonContainer}>
          <RectButton onPress={toggleSearchForm} style={styles.toggleButton}>
            {isFiltersVisible? <Icon name="filter" size={20} color="#e33d3d" />:<Icon name="filter" size={20} color="#04d361" />}
            <Text style={styles.toggleButtonText}>Filtrar por dia, hora e matéria</Text>
            {isFiltersVisible? <Icon name="chevron-up" size={20} color="#D4C2FF" />:<Icon name="chevron-down" size={20} color="#D4C2FF" />}
          </RectButton>
        </View>

        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <RNPickerSelect
              placeholder={{
                label: subject,
                value: subject,
                color: "#C1BCCC",
              }}
              onValueChange={(value) => setSubject(value)}
              items={[
                { label: "Matemática", value: "Matemática" },
                { label: "Português", value: "Português" },
                { label: "Ciências", value: "Ciências" },
                { label: "História", value: "História" },
                { label: "Geografia", value: "Geografia" },
                { label: "Física", value: "Física" },
                { label: "Química", value: "Química" },
                { label: "Filosofia", value: "Filosofia" },
                { label: "Sociologia", value: "Sociologia" },
                { label: "Biologia", value: "Biologia" },
              ]}
            />

            <View style={styles.inputGroup}>
              <RNPickerSelect
                placeholder={{
                  label: String(weekDay),
                  value: weekDay,
                  color: "#C1BCCC"
                }}
                onValueChange={(value) => setWeekDay(value)}
                items={[
                  { label: "Domingo", value: 0 },
                  { label: "Segunda", value: 1 },
                  { label: "Terça", value: 2 },
                  { label: "Quarta", value: 3 },
                  { label: "Quinta", value: 4 },
                  { label: "Sexta", value: 5},
                  { label: "Sábado", value: 6 },
                ]}
              />

              <RNPickerSelect
                placeholder={{
                  label: time,
                  value: time,
                  color: "#C1BCCC"
                }}
                onValueChange={(value) => setTime(value)}
                items={[
                  { label: "6 Horas", value: "6:00" },
                  { label: "7 Horas", value: "7:00" },
                  { label: "8 Horas", value: "8:00" },
                  { label: "9 Horas", value: "9:00" },
                  { label: "10 Horas", value: "10:00" },
                  { label: "11 Horas", value: "11:00" },
                  { label: "12 Horas", value: "12:00" },
                  { label: "13 Horas", value: "13:00" },
                  { label: "14 Horas", value: "14:00" },
                  { label: "15 Horas", value: "15:00" },
                  { label: "16 Horas", value: "16:00" },
                  { label: "17 Horas", value: "17:00" },
                  { label: "18 Horas", value: "18:00" },
                  { label: "19 Horas", value: "19:00" },
                ]}
              />
            </View>

            <RectButton style={styles.filterButton} onPress={searchTeachers}>
              <Text style={styles.filterButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      
      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
        showsVerticalScrollIndicator={false}
      >
        {teachers.map((teacher: TeachersProps) => (
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default TeacherList

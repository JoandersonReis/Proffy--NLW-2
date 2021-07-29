import React, { useState } from "react"
import { ScrollView, View, TextInput, Text } from "react-native"
import PageHeader from "../../components/PageHeader"
import { BorderlessButton, RectButton } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Feather"
import AsyncStorage from "@react-native-async-storage/async-storage"

import styles from "./styles"

import TeacherItem from "../../components/TeacherItem"
import api from "../../services/api"
import { Alert } from "react-native"

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

  const [ subject, setSubject ] = useState("")
  const [ weekDay, setWeekDay ] = useState("")
  const [ time, setTime ] = useState("")

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
        headerRight={isFiltersVisible?
          <BorderlessButton style={styles.toggleButton} onPress={toggleSearchForm}>
            <Icon name="filter" size={20} color="#e33d3d" />
          </BorderlessButton>
          :
          <BorderlessButton style={styles.toggleButton} onPress={toggleSearchForm}>
            <Icon name="filter" size={20} color="#04d361" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Qual matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Qual dia?"
                  placeholderTextColor="#c1bccc"
                  value={weekDay}
                  onChangeText={text => setWeekDay(text)} 
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
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

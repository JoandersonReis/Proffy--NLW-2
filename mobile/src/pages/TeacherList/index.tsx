import React, { useState } from 'react'
import { View, ScrollView, TextInput, Text} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from "@expo/vector-icons"
import AsyncStorage from "@react-native-community/async-storage"

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'


export default function TeacherList() {
  const [ isFiltersVisible, setIsFiltersVisible ] = useState(false)
  
  const [ subject, setSubject ] = useState("")
  const [ week_day, setWeekDay ] = useState("")
  const [ time, setTime ] = useState("")

  const [ teachers, setTeachers ] = useState<Teacher[]>([])
  const [ favorites, setFavorites ] = useState<number[]>([])

  function loadFavorites() {
  AsyncStorage.getItem("favorites").then(response => {
    if(response) {
      const favoritesTeachers = JSON.parse(response)
      const favoritesIds = favoritesTeachers.map((favorite: Teacher) => {
        return favorite.id
      })

      setFavorites(favoritesIds)
    }
  })
  }

  function handleToggleFilterVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFilterSubmit() {
    loadFavorites()

    const response = await api.get("/classes", {
      params: {
        subject,
        week_day,
        time
      }
    })
    
    setTeachers(response.data)
    setIsFiltersVisible(false)
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather name="filter" size={25} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bcbc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bcbc" 
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bcbc"
                />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {teachers.map(teacher => (
          <TeacherItem
            teacher={teacher} 
            key={String(teacher.id)}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

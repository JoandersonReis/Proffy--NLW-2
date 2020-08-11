import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from "@react-navigation/native"

import styles from "./styles"
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

export default function Favorites() {
  const [ favorites, setFavorites ] = useState([])

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then(response => {
      if(response) {
        const favoritesTeachers = JSON.parse(response)
  
        setFavorites(favoritesTeachers)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys Favoritos" />

      <ScrollView
        style={styles.teacherList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {favorites.map((favorite: Teacher) => (
          <TeacherItem teacher={favorite} favorited key={String(favorite.id)} />
        ))}
      </ScrollView>
    </View>
  )
}
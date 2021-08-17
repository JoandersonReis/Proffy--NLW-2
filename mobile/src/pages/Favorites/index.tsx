import React, { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Text, View, ScrollView, Image } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import { TeachersProps } from "../TeacherList"
import TeacherItem from "../../components/TeacherItem"
import PageHeader from "../../components/PageHeader"

import emojiLoveIcon from "../../assets/images/icons/emoji-love.png"

import styles from "./styles"

function Favorites() {
  const [ favorites, setFavorites ] = useState([])

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then(response => {
      if(response) {
        const favoritedTeachers = JSON.parse(response)

        setFavorites(favoritedTeachers)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Meus Proffys favoritos" 
        headerRight={
          <View style={styles.totalFavoritesProffys}>
            <Image source={emojiLoveIcon} resizeMode="contain" />
            <Text style={styles.totalFavoritesProffysText}>32 Proffys</Text>
          </View>
        } 
      />

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
        showsVerticalScrollIndicator={false}
      >
        {favorites.map((teacher: TeachersProps) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />
        })}
      </ScrollView>
    </View>
  )
}

export default Favorites

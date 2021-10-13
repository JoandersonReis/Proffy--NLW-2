import React, { useState, useEffect } from "react";
import { Image, ImageEditor, Linking, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles"

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png"
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png"
import whatsappIcon from "../../assets/images/icons/whatsapp.png"
import arrowRightIcon from "../../assets/images/icons/arrow-right.png"

import { TeachersProps } from "../../pages/TeacherList"
import api from "../../services/api";
import convertNumberInWeekDay from "../../utils/convertNumberInWeekDay";


interface TeacherProps {
  teacher: TeachersProps,
  favorited: boolean
}

interface ScheduleProps {
  week_day: number,
  from: number,
  to: number
}

const TeacherItem: React.FC<TeacherProps> = ({teacher, favorited}) => {
  const [ isFavorited, setIsFavorited ] = useState(favorited)

  const [ schedule, setSchedule ] = useState([{week_day: 0, from: 220, to: 600}])

  function  handleSendWhatsapp() {
    api.post("connections", { user_id: teacher.id })

    Linking.openURL(`whatsapp://send?phone=55${teacher.whatsapp}`)
  }

  async function loadSchedule() {
    const response = await api.get("/schedules", {
      params: {
        class_id: teacher.id
      }
    })

    setSchedule(response.data)
  }

  useEffect(() => {
    loadSchedule()
  }, [])

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites")

    let favoritesArray = []

    if(favorites) {
      favoritesArray = JSON.parse(favorites)
    }

    if(isFavorited) {
      // Retorna a posição do array caso a condição for atendida
      const favoriteIndex = favoritesArray.findIndex((teacherItem: TeachersProps) => {
        return teacherItem.id === teacher.id
      })

      favoritesArray.splice(favoriteIndex, 1)

      setIsFavorited(false)
    } else {
      favoritesArray.push(teacher)

      setIsFavorited(true)
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray))
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{
            uri: `${teacher.avatar}`,
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name} {teacher.lastname}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      
      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.scheduleContainer}>
        {schedule.map((item: ScheduleProps) => (
          <View style={styles.schedule} key={item.week_day}>
            <View style={styles.labelsContainer}>
              <Text style={styles.label}>Dia</Text>
              <Text style={styles.label}>Horário</Text>
            </View>

            <View style={styles.dayTimeContainer}>
              <Text style={styles.dayTime}>{convertNumberInWeekDay(item.week_day)}</Text>
              <Image source={arrowRightIcon} />
              <Text style={styles.dayTime}>{item.from / 60}h - {item.to / 60}h</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {"   "}
          <Text style={styles.priceValue}>
            R$ {teacher.cost.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            style={[styles.favoriteButton, isFavorited? styles.favorited : {}]}
            onPress={handleToggleFavorite}
          >
            {isFavorited? 
              <Image source={unfavoriteIcon} />
              :
              <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleSendWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contanto</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem

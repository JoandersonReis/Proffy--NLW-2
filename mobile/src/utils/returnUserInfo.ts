import AsyncStorage from "@react-native-async-storage/async-storage"

export default async (field: string) => {
  const response = await AsyncStorage.getItem("user")
  const [user] = JSON.parse(String(response))

  return user.[field]
}
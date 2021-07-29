export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(":").map(Number) // Separa o "time" e tranforma em números armazenando nas seguintes váriaveis de acordo com a posição no array

  const timeInMinutes = (hour * 60) + minutes

  return timeInMinutes
}
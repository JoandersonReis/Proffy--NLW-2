export default (minutes: number) => {
  const hours = minutes / 60 < 10? `0${minutes / 60}:00`:`${minutes / 60}:00`

  return hours
}
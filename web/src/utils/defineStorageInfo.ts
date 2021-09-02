const userLocalStorage = window.localStorage
const userSessionStorage = window.sessionStorage

export default (key: string) => {
  
  if(userLocalStorage.length > 0) {
    return userLocalStorage.getItem(key)
  }

  if(userSessionStorage.length > 0) {
    return userSessionStorage.getItem(key)
  }
}
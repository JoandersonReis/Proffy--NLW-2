const userLocalStorage = window.localStorage
const userSessionStorage = window.sessionStorage

export default () => {
  if(userLocalStorage.length == 0 && userSessionStorage.length == 0) {
    return false
  }

  return true
}
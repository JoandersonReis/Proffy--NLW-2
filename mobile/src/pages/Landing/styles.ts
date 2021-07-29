import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8257E5",
    justifyContent: "center",
    padding: 40
  },

  banner: {
    width: "100%",
    resizeMode: "contain"
  },

  title: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
    fontFamily: "Poppins Regular"
  },

  titleBold: {
    fontFamily: "Poppins SemiBold"
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40
  },

  button: {
    height: 150,
    width: "48%",
    borderRadius: 8,
    justifyContent: "space-between",
    padding: 24
  },

  buttonPrimary: {
    backgroundColor: "#9871f5"
  },

  buttonSecondary: {
    backgroundColor: "#04d361"
  },

  buttonText: {
    fontFamily: "Archivo Bold",
    color: "#fff",
    fontSize: 16
  },

  totalConnections: {
    fontFamily: "Poppins Regular",
    fontSize: 12,
    color: "#d4c2ff",
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40
  }
})

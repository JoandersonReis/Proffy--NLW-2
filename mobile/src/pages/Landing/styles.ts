import { StyleSheet } from "react-native";

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
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
    color: "#fff",
    fontFamily: "Poppins_400Regular"
  },

  titleBold: {
    fontFamily: "Poppins_600SemiBold"
  },

  buttonsContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  button: {
    height: 150,
    width: "48%",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderRadius: 8
  },

  buttonPrimary: {
    backgroundColor: "#9871f5"
  },

  buttonSecondary: {
    backgroundColor: "#04d361"
  },

  buttonText: {
    fontFamily: "Archivo_700Bold",
    fontSize: 20,
    color: "#fff"
  },

  totalConnections: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#d4c2ff",
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40
  },
})

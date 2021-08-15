import { StyleSheet } from "react-native"

export default StyleSheet.create({
  header: {
    backgroundColor: "#8257E5",
    width: "100%",
    paddingVertical: 20,
    alignItems: "center"
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    width: "90%",
    marginBottom: 30,
  },

  profile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 8,
  },

  profileName: {
    fontFamily: "Poppins Regular",
    fontSize: 14,
    color: "#D4C2FF"
  },

  logoutButton: {
    backgroundColor: "#774DD6",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },

  banner: {
    width: "100%",
    resizeMode: "contain"
  },

  content: {
    paddingHorizontal: 40,
    height: "60%"
  },

  title: {
    color: "#6A6180",
    fontSize: 20,
    lineHeight: 30,
    marginTop: 20,
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
    color: "#9C98A6",
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40
  }
})

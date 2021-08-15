import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flexDirection: "column",
    alignItems: "center",
    height: "100%"
  },

  form: {
    width: "80%",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center"
  },

  formHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  title: {
    fontSize: 24,
    fontFamily: "Poppins SemiBold",
    color: "#32264D"
  },

  createAccountButtonText: {
    fontSize: 12,
    color: "#8257E5",
    fontFamily: "Poppins Regular"
  },

  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 13,
    padding: 10
  },

  showPasswordImg: {
    height: 22,
    width: 22,
    resizeMode: "contain"
  },

  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rememberText: {
    marginLeft: 4,
    color: "#9C98A6",
    fontFamily: "Poppins Regular",
    fontSize: 12
  },

  forgottenPasswordText: {
    marginLeft: 4,
    color: "#9C98A6",
    fontFamily: "Poppins Regular",
    fontSize: 12
  }
})
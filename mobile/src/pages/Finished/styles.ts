import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#9871F5",
    width: "100%",
    alignItems: "center"
  },

  content: {
    width: "90%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },

  title: {
    fontFamily: "Archivo Bold",
    fontSize: 32,
    color: "#fff",
    maxWidth: 250,
    lineHeight: 45,
    marginVertical: 20,
    textAlign: "center"
  },

  description: {
    color: "#D4C2FF",
    fontSize: 14,
    fontFamily: "Poppins Regular",
    maxWidth: 250,
    textAlign: "center"
  },

  finishedButton: {
    backgroundColor: "#04D361",
    height: 56,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },

  finishedButtonText: {
    fontFamily: "Archivo SemiBold",
    color: "#fff",
    fontSize: 16
  }
})

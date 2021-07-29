import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8257E5",
    justifyContent: "center",
    padding: 40
  },

  content: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    fontFamily: "Archivo Bold",
    lineHeight: 37,
    fontSize: 32,
    maxWidth: 180,
    color: "#fff"
  },

  description: {
    marginTop: 24,
    color: "#d4c2ff",
    fontSize: 16,
    lineHeight: 26,
    fontFamily: "Poppins Regular",
    maxWidth: 240
  },

  okButton: {
    backgroundColor: "#04d361",
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40
  },

  okButtonText: {
    fontFamily: "Archivo Bold",
    fontSize: 16,
    color: "#fff"
  }
})
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: "#8257E5",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "Archivo Bold",
    fontSize: 24,
    color: "#fff",
    lineHeight: 32,
    marginVertical: 40,
    maxWidth: 160
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})
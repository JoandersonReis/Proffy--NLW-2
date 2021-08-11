import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    position: "relative"
  },

  selected: {
    height: 48,
    width: 2,
    backgroundColor: "#8257E5",
    position: "absolute",
    zIndex: 2,
    top: 8
  },

  input: {
    height: 64,
    backgroundColor: "#fafafc",
    marginBottom: 1,
    borderRadius: 8,
    padding: 12,
    fontFamily: "Poppins Regular",
    color: "#000",
    paddingRight: 50,
  }
})
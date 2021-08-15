import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#E6E6F0",
    height: "100%"
  },

  header: {
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 50
  },

  backButtonImg: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },

  rollingIndex: {
    color: "#8257E5",
    fontSize: 30,
  },

  rollingIndexWhite: {
    color: "#C1BCCC",
    fontSize: 30,
  },

  title: {
    fontFamily: "Poppins SemiBold",
    fontSize: 32,
    color: "#32264D",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 30
  },

  description: {
    fontFamily: "Poppins Regular",
    fontSize: 14,
    color: "#6A6180",
    maxWidth: 250,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 15
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
  }
})
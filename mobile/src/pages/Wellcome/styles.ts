import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
  },

  banner: {
    height: "45%",
    backgroundColor: "#8257E5",
    alignItems: "center",
    justifyContent: "center"
  },

  bannerBackgroundImage: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center"
  },

  bannerIcon: {
    width: 100,
    height: 100
  },

  content: {
    height: "50%",
    paddingHorizontal: 30,
    paddingVertical: 40
  },

  stageNumber: {
    fontFamily: "Archivo SemiBold",
    fontSize: 40,
    color: "#C1BCCC"
  },

  description: {
    fontFamily: "Poppins SemiBold",
    fontSize: 24,
    color: "#6A6180",
    marginTop: 12,
    maxWidth: 300
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40
  },

  stageIndicator: {
    fontSize: 24,
    fontFamily: "Poppins SemiBold",
    color: "#C1BCCC"
  },

  indicatorSelected: {
    color: "#8257E5"
  },

  nextButton: {
    padding: 10,
  }
})
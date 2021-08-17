import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },

  teacherList: {
    marginTop: -25
  },

  totalProffys: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  totalProffysText: {
    fontSize: 12,
    fontFamily: "Poppins Regular",
    color: "#D4C2FF",
    marginLeft: 4,
  },

  toggleButtonContainer: {
    borderBottomColor: "#9871F5",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginBottom: 20
  },

  toggleButton: {
    flexDirection: "row",
    height: 35,
    justifyContent: "space-between"
  },

  toggleButtonText: {
    fontFamily: "Poppins Regular",
    fontSize: 14,
    color: "#D4C2FF"
  },

  searchForm: {
    marginVertical: 8
  },

  pickerGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: '50%',
    marginBottom: 20
  },

  filterButton: {
    backgroundColor: "#04d361",
    alignSelf: "center",
    width: "100%",
    height: 54,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },

  filterButtonText: {
    fontFamily: "Archivo Bold",
    fontSize: 18,
    color: "#fff",
  }
})
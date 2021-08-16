import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },

  teacherList: {
    marginTop: -40
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

  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins Regular"
  },


 
  
  inputBlock: {
    width: "48%"
  },

  input: {
    height: 54,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
    color: "#000"
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
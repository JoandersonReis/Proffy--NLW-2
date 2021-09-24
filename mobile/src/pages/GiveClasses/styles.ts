import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },

  description: {
    fontFamily: "Poppins Regular",
    fontSize: 14,
    color: "#D4C2FF",
    marginBottom: 12
  },
  
  content: {
    marginTop: -25,
    marginBottom: 20,
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#fff",
    alignSelf: "center"
  },
  
  form: {
    padding: 26,
  },

  titleContainer: {
    paddingVertical: 8,
    borderBottomColor: "#E6E6F0",
    borderBottomWidth: 1,
    marginBottom: 12
  },

  title: {
    fontFamily: "Archivo SemiBold",
    fontSize: 20,
    color: "#32264D"
  },

  profileContainer: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 32
  },

  profileInfo: {
    justifyContent: "center",
    marginLeft: 16
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  
  profileName: {
    fontFamily: "Archivo SemiBold",
    fontSize: 20,
    color: "#32264D"
  },
  
  subject: {
    fontFamily: "Poppins Regular",
    fontSize: 12,
    color: "#6A6180",
    marginTop: 4
  },

  label: {
    fontFamily: "Poppins Regular",
    fontSize: 12,
    color: "#9C98A6",
    marginBottom: 4
  },

  input: {
    backgroundColor: "#FAFAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E6F0",
    marginBottom: 18,
    paddingHorizontal: 16,
    color: "#000"
  },

  bio: {
    padding: 10
  },

  titleTimeContainer: {
    paddingVertical: 8,
    marginBottom: 12,
    borderBottomColor: "#E6E6F0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },

  scheduleBlock: {
    borderTopColor: "#8257E5",
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8
  },

  addNewClassButtonText: {
    fontSize: 14,
    fontFamily: "Archivo SemiBold",
    color: "#8257E5",
    paddingHorizontal: 10,
    paddingTop: 5
  },

  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputTimeBlock: {
    width: "48%"
  },

  footer: {
    borderTopColor: "#E6E6F0",
    borderTopWidth: 1,
    backgroundColor: "#FAFAFC",
    padding: 20
  },

  registerButton: {
    backgroundColor: "#04D361",
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  registerButtonText: {
    fontFamily: "Archivo SemiBold",
    fontSize: 16,
    color: "#fff"
  },

  warning: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center"
  },

  warningTextStrong: {
    color: "#8257E5",
    fontFamily: "Poppins Regular",
    fontSize: 12,
    marginLeft: 16,
    lineHeight: 20
  },

  warningText: {
    color: "#A0A0B2"
  }
})
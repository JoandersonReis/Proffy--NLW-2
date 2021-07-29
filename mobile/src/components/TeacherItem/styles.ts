import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e6e6f0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#eee"
  },

  profileInfo: {
    marginLeft: 16
  },

  name: {
    fontFamily: "Archivo Bold",
    color: "#32264d",
    fontSize: 20
  },

  subject: {
    fontFamily: "Poppins Regular",
    color: "#6a6180",
    fontSize: 12,
    marginTop: 4
  },

  bio: {
    marginHorizontal: 24,
    fontFamily: "Poppins Regular",
    lineHeight: 27,
    fontSize: 14,
    color: "#6a6180",
  },

  footer: {
    backgroundColor: "#fafafc",
    padding: 24,
    alignItems: "center",
    marginTop: 14
  },

  price: {
    fontFamily: "Poppins Regular",
    fontSize: 14,
    color: "#646180"
  },

  priceValue: {
    fontFamily: "Archivo Bold",
    fontSize: 16,
    color: "#8257e5"
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16
  },

  favorited: {
    backgroundColor: "#e33d3d"
  },

  favoriteButton: {
    backgroundColor: "#8257e5",
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },

  contactButton: {
    backgroundColor: "#04d361",
    flex: 1,
    flexDirection: "row",
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  contactButtonText: {
    fontSize: 16,
    fontFamily: "Archivo Bold",
    color: "#fff",
    marginLeft: 16
  }
})
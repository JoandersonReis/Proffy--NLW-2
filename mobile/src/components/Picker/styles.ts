import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },

  toggleButton: {
    height: 48,
    backgroundColor: "#F8F8FC",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 8
  },

  toggleButtonText: {
    color: "#9C98A6",
    fontFamily: "Poppins Regular",
    fontSize: 14
  },

  menu: {
    backgroundColor: "#F8F8FC",
    position: "absolute",
    zIndex: 99,
    width: "100%",
    top: 48,
    maxHeight: 170,
    borderRadius: 8
  },

  menuItem: {
    height: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  menuItemText: {
    fontFamily: "Poppins Regular",
    fontSize: 14,
    color: "#6A6180"
  },

  itemSelected: {
    backgroundColor: "#EBEBF5",
  },
  
  itemSelectedText: {
    fontFamily: "Poppins SemiBold"
  },

  itemSelectedMark: {
    height: 48,
    width: 2,
    backgroundColor: "#8257E5",
    position: "absolute",
    left: 0
  }
})
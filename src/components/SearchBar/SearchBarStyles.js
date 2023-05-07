import { StyleSheet } from "react-native";
import Colors from "../../assets/colors/colors";

const SearchBarStyles = StyleSheet.create({
  HomeSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    paddingHorizontal: 20,
  },
  inputContainer: {
    height: 50,
    backgroundColor: Colors.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default SearchBarStyles;

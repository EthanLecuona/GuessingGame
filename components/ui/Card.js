import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../utils/colors";

function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary700,
    borderRadius: 10,
    //Drop Shadow - Android Only
    elevation: 4,
    zIndex: 99,
    //Drop Shadow - IOS
    shadowColor: "#000000",
    shadowOffset: { width: 10, height: 10 }, //Left and Right
    shadowRadius: 6,
    shadowOpacity: 0.2,
  },
});

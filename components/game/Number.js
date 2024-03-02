import { Text, StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../utils/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    color: Colors.accent500,
    padding: deviceWidth < 450 ? 12 : 24,
    marginTop: deviceWidth < 380 ? 12 : 24,
    borderWidth: 4,
    borderColor: Colors.accent500,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontFamily: "open-sans-bold",
  },
});

import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 20,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "white",
    maxWidth: "80%",
  },
});

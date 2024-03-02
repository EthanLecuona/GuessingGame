import { StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/colors";

function RoundItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.text}>#{roundNumber}</Text>
      <Text style={styles.text}>Phone's guess: {guess}</Text>
    </View>
  );
}

export default RoundItem;

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    justifyContent: "space-between",
    elevation: 4,
    flexDirection: "row",
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 30,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.primary700,
  },
});

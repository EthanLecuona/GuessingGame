import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../utils/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ chosenNumber, tryCount, onNewGame }) {
  return (
    <View style={styles.container}>
      <Title>Game Over!</Title>
      <View style={styles.imageContainer}>
        <View>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
      </View>
      <Text style={styles.sumaryText}>
        Your phone needed <Text style={styles.highlight}>{tryCount}</Text>{" "}
        rounds to guess number{" "}
        <Text style={styles.highlight}>{chosenNumber}</Text>.
      </Text>
      <View>
        <PrimaryButton onPress={onNewGame}>New Game</PrimaryButton>
      </View>
    </View>
  );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 2,
    borderColor: Colors.primary700,
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  sumaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
  },
  highlight: {
    color: Colors.primary500,
    fontFamily: "open-sans-bold",
  },
});

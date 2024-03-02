import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/Number";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import RoundItem from "../components/game/RoundItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ chosenNumber, onGameOver, onTryCounter }) {
  const initialGuess = generateRandomBetween(1, 100, chosenNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess == chosenNumber) {
      minBoundary = 1;
      maxBoundary = 100;
      setRounds([]);
      onGameOver();
    }
  }, [currentGuess, chosenNumber, onGameOver]);
  // useEffect(() => {

  // }, [])

  function nextGuessHandler(direction) {
    onTryCounter();
    if (
      (direction === "lower" && currentGuess < chosenNumber) ||
      (direction === "higher" && currentGuess > chosenNumber)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong...", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    }

    if (direction === "higher") {
      //+ 1 because it is inclusive unline maxBoundary
      minBoundary = currentGuess + 1;
    }

    const newRndNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNum);
    setRounds((prevRounds) => [...prevRounds, newRndNum]);
  }

  return (
    <View style={styles.contianer}>
      <Title>Phone's Guess</Title>
      <NumberContainer>{String(currentGuess)}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove-circle-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <FlatList
          data={rounds}
          keyExtractor={(item) => item}
          renderItem={(itemData) => (
            <RoundItem roundNumber={itemData.index + 1} guess={itemData.item}>
              {itemData.item}
            </RoundItem>
          )}
        />
        {/* {rounds.map((round) => (
          <Text key={round}>{round}</Text>
        ))} */}
      </View>
    </View>
  );
}

export default GameScreen;
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    padding: 30,
    marginTop: 75,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    // flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

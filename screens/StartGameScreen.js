import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../utils/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [input, setInput] = useState();
  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredNumber) {
    setInput(enteredNumber);
  }
  function resetNumber() {
    setInput(0);
  }
  function handleConfirm() {
    const chosenNumber = parseInt(input);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number has to be a number between 1-99", [
        { text: "Okay", style: "destructive", onPress: resetNumber },
      ]);
      return;
    }
    onPickNumber(chosenNumber);
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[{ marginTop: marginTopDistance }, styles.rootContainer]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter Number</InstructionText>
            <TextInput
              placeholder="1"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              style={styles.input}
              maxLength={2}
              onChangeText={numberInputHandler}
              value={input}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetNumber}>Reset</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  input: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 10,
    fontWeight: "bold",
    width: "20%",
    textAlign: "center",
  },
});

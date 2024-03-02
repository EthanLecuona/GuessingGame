import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../utils/colors";
function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.containerOuter}>
      <Pressable
        android_ripple={{ color: "Colors.primary600" }}
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.containerInner]
            : styles.containerInner
        }
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  containerOuter: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  containerInner: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  //For IOS similar to Android-ripple
  pressed: {
    opacity: 0.75,
  },
});

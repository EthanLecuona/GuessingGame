import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StartGameScreen from "./screens/StartGameScreen";
import { useEffect, useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./utils/colors";
import GameOverScreen from "./screens/GameOverScreen";

SplashScreen.preventAutoHideAsync();

async function fakePause() {
  new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const [tryCount, setTryCount] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Artificially delay for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // Pre-load fonts, images, or any other assets here
        // Since you're using useFonts, the loading is handled outside
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      if (appIsReady && fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary700} />
      </View>
    );
  }

  function handleTryCounter() {
    setTryCount((preTryCount) => preTryCount + 1);
  }
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen
        chosenNumber={userNumber}
        onGameOver={gameOverHandler}
        onTryCounter={handleTryCounter}
      />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        chosenNumber={userNumber}
        tryCount={tryCount}
        onNewGame={newGameHandler}
      />
    );
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }
  function newGameHandler() {
    setTryCount(0);
    setUserNumber(null);
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.container}
      >
        <ImageBackground
          resizeMode="cover"
          source={require("./assets/images/background.png")}
          style={styles.container}
          imageStyle={styles.image}
        >
          <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    opacity: 0.15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

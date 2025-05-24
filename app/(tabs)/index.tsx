import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ProgressBar } from "react-native-paper";

import { Header } from "@/presentation/shared/components";
import { ThemedView } from "@/presentation/theme/components";

import { Calc } from "@/config/helpers";

export default function HomeScreen() {
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState(Calc.getRandomNumber(0, 10000));

  


  const handleSync = () => {
    setSyncing(true);
    setProgress(0);

    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 0.1;
      setProgress(progressValue);
      if (progressValue >= 1) {
        clearInterval(interval);
        setSyncing(false);
        setSteps(Calc.getRandomNumber(0, 10000));
        // Alert.alert("Sincronización exitosa con el dispositivo BLE");
      }
    }, 200);
  };

  

  return (
    <ThemedView safe>
      <Header title="Bienvenido" />

      <View style={styles.content}>
        <Text style={styles.steps}>{steps} pasos</Text>

        {syncing ? (
          <>
            <ActivityIndicator size="large" color="#4682B4" />
            <ProgressBar
              progress={progress}
              color="#4682B4"
              style={styles.progressBar}
            />
          </>
        ) : (
          <Button title="Sincronizar dispositivo" onPress={handleSync} />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  steps: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  progressBar: {
    width: "60%",
    marginTop: 20,
    height: 8,
    borderRadius: 4,
  },
});

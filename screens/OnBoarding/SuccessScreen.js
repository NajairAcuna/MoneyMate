import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>Welcome to MoneyMate.</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        // accessibilityLabel="Go to dashboard"
      >
      <Text>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
});

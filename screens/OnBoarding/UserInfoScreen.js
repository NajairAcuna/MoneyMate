import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";

const UserInfoScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [allowance, setAllowance] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's get to know you</Text>
      <Text style={styles.label}>What's your name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Name Input"
        returnKeyType="done"
      />
      <Text style={styles.label}>How old are you?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        accessibilityLabel="Age Input"
        returnKeyType="numeric"
      />
      <Text style={styles.label}>What is your monthly allowance?</Text>
      <TextInput
        style={styles.input}
        placeholder="$0.00"
        value={allowance}
        onChangeText={setAllowance}
        accessibilityLabel="Monthly Allowance Input"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => {
          console.log("Navigation to set goal...");
          navigation.navigate("SetGoal");
        }}
        accessibilityLabel="Next button"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
},
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Progress from "react-native-progress";


const GoalsScreen = () => {
  const [goals, setGoals] = useState([
    { name: "Laptop", target: 300, saved: 90 },
    { name: "Phone", target: 500, saved: 150 },
    { name: "Trip to NYC", target: 800, saved: 200 },
  ]);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [addAmount, setAddAmount] = useState("");

  const selectedGoal = goals[selectedGoalIndex];
  const progress = selectedGoal.saved / selectedGoal.target;

  const handleAddToSavings = () => {
    const numericAmount = parseFloat(addAmount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const newSaved = selectedGoal.saved + numericAmount;
      const updatedGoals = [...goals];

      if (newSaved <= selectedGoal.target) {
        updatedGoals[selectedGoalIndex].saved = newSaved;
      } else {
        updatedGoals[selectedGoalIndex].saved = selectedGoal.target;
      }

      setGoals(updatedGoals);
      setAddAmount("");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.ScrollContent}
    >
      <Text style={styles.title}>🎯 Your Goals</Text>

      <Text style={styles.inputLabel}>Select a Goal</Text>
      <View style={styles.section}>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedGoalIndex}
            onValueChange={(itemValue) => setSelectedGoalIndex(itemValue)}
            style={styles.picker}
          >
            {goals.map((goal, index) => (
              <Picker.Item key={index} label={goal.name} value={index} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.goalText}>Goal Amount: ${selectedGoal.target}</Text>
        <Text style={styles.goalText}>
          You've saved: ${selectedGoal.saved.toFixed(2)}
        </Text>
      </View>

      <View style={styles.section}>
      <Progress.Bar
        progress={progress}
        width={null}
        height={12}
        color="#4CAF50"
        unfilledColor="#eee"
        borderRadius={6}
        style={styles.progress}
      />
      </View>

      <Text style={styles.inputLabel}>Add to Savings</Text>
      <View style={styles.section}>
      <TextInput
        style={styles.input}
        placeholder="$0.00"
        value={addAmount}
        onChangeText={setAddAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddToSavings}>
        <Text style={styles.buttonText}>Add to Savings</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 48,
    width: "100%",
  },
  goalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  progress: {
    marginVertical: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  ScrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  }

});

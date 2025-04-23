import React, { useEffect, useState } from "react";
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
import ConfettiCannon from "react-native-confetti-cannon";
import monteQuotes, {monteCelebrationQuotes} from "../../utils/monteQuotes";
import { Audio } from "expo-av";
import chaching from '../../assets/sounds/chaching.mp3';
import confetti from '../../assets/sounds/confetti.mp3';
import levelwin from '../../assets/sounds/levelwin.mp3';
import airhorn from '../../assets/sounds/airhorn.mp3';
// import explosion from '../../assets/sounds/explosion.mp3';
// import chime from '../../assets/sounds/chime.mp3';
// import crowdcheer from '../../assets/sounds/crowdcheer.mp3';



const GoalsScreen = () => {
  const [goals, setGoals] = useState([
    { name: "Laptop", target: 300, saved: 90 },
    { name: "Phone", target: 500, saved: 150 },
    { name: "Trip to NYC", target: 800, saved: 200 },
  ]);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [addAmount, setAddAmount] = useState("");

  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [addGoalModalVisible, setAddGoalModalVisible] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [monteQuote, setMonteQuote] = useState('');

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);
  
  const selectedGoal = goals[selectedGoalIndex];
  const progress = selectedGoal.saved / selectedGoal.target;

  const playSound = async (soundFile) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish){
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Sound error', error);
    }
  };

  const handleAddToSavings = async () => {
    console.log('Savings button pressed');
    const numericAmount = parseFloat(addAmount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const newSaved = selectedGoal.saved + numericAmount;
      const isGoalReached = newSaved >= selectedGoal.target;

      const updatedGoals = [...goals];
      updatedGoals[selectedGoalIndex].saved =
        newSaved <= selectedGoal.target ? newSaved : selectedGoal.target;

      setGoals(updatedGoals);
      setAddAmount("");

      // Monte says ...
     let quoteToUse;
      if (
        isGoalReached &&
        selectedGoal.saved < selectedGoal.target &&
        newSaved >= selectedGoal.target
      ) {
        const specialQuote = monteCelebrationQuotes[Math.floor(Math.random() * monteCelebrationQuotes.length)];
        quoteToUse = specialQuote;

        await playSound(confetti);

        //bonus sound
        const updatedGoal = updatedGoals[selectedGoalIndex];
        if (updatedGoal.target >= 1000){
          setTimeout(() => {
          playSound(airhorn);
        }, 500);
        }
        if (updatedGoal.target >= 5000){
          setTimeout(() => {
          playSound(levelwin);
        }, 500);
        }

      } else {
        const regularQuote = monteQuotes[Math.floor(Math.random() * monteQuotes.length)];
        quoteToUse = regularQuote;
        playSound(chaching);
      }

      setMonteQuote(quoteToUse);


      if(isGoalReached && updatedGoals[selectedGoalIndex].saved === updatedGoals[selectedGoalIndex].target) {
        console.log('Confetti condition met')
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
    {showConfetti && (
      <ConfettiCannon
        count={100}
        origin={{ x: 200, y: 0 }}
        explosionSpeed={350}
        fallSpeed={3000}
        fadeOut={true}
        autoStart={true}
      />
    )}

    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>🎯 Your Goals</Text>

      <Text style={styles.inputLabel}>Select a Goal</Text>
      <TouchableOpacity
        style={styles.dropdownBox}
        onPress={() => setGoalModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {goals[selectedGoalIndex].name}
        </Text>
      </TouchableOpacity>

      {/* Select Goal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={goalModalVisible}
        onRequestClose={() => setGoalModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Goal</Text>
            <Picker
              selectedValue={selectedGoalIndex}
              onValueChange={(itemValue) => setSelectedGoalIndex(itemValue)}
            >
              {goals.map((goal, index) => (
                <Picker.Item 
                key={index} 
                label={goal.name} 
                value={index}
                color='#000'
                 />
                
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.addGoalButton}
              onPress={() => {
                setGoalModalVisible(false);
                setIsEditingGoal(false);
                setTimeout(() => {
                  setAddGoalModalVisible(true);
                },300);
              }}
            >
              <Text style={styles.addGoalButtonText}>➕ Add New Goal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addGoalButton}
              onPress={() => {
                setGoalModalVisible(false)
                setIsEditingGoal(true);
                setNewGoalName(goals[selectedGoalIndex].name);
                setNewGoalAmount(String(goals[selectedGoalIndex].target));
                setTimeout(() => setAddGoalModalVisible(true), 300);
              }}
            >
              <Text style={styles.addGoalButtonText}>✏️ Edit Goal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setGoalModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add New Goal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addGoalModalVisible}
        onRequestClose={() => {
          setAddGoalModalVisible(false)
          setIsEditingGoal(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEditingGoal ? 'Edit Goal' : 'Add New Goal'}</Text>

            <TextInput
              style={styles.input}
              placeholder="Goal name"
              value={newGoalName}
              onChangeText={setNewGoalName}
            />

            <TextInput
              style={styles.input}
              placeholder="Target amount"
              value={newGoalAmount}
              onChangeText={setNewGoalAmount}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const amount = parseFloat(newGoalAmount);
                if (!newGoalName || isNaN(amount) || amount <= 0) return;
                if (isEditingGoal) {
                  const updatedGoals = [...goals];
                  updatedGoals[selectedGoalIndex].name = newGoalName; 
                  updatedGoals[selectedGoalIndex].target = amount;
                  setGoals(updatedGoals);
                } else {
                  const newGoal = {
                    name: newGoalName,
                    target: amount,
                    saved: 0,
                  };
                  const updatedGoals = [...goals, newGoal];
                  setGoals(updatedGoals);
                  setSelectedGoalIndex(updatedGoals.length - 1);
                }
                setNewGoalName('');
                setNewGoalAmount('');
                setIsEditingGoal(false);
                setAddGoalModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{isEditingGoal ? 'Save Changes' : 'Save Goal'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => {
                 setAddGoalModalVisible(false)
                 setIsEditingGoal(false);
              }}
            >
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Goal Info */}
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

      {/* Monte's Quotes */}
      {monteQuote !== '' && (
        <View style={{ marginTop: 20, backgroundColor: '#e0f7fa', padding: 16, borderRadius: 12}}>
          <Text style={{fontSize: 16, fontStyle: 'italic', color: '#00796b'}}>
            {monteQuote}
          </Text>
        </View>
      )}

      {/* Add to Savings */}
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
    </View>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
  },
  scrollContent: {
    paddingBottom: 40,
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
  dropdownBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
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
    backgroundColor: "#fff",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  addGoalButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  addGoalButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  closeModalButton: {
    marginTop: 12,
    alignItems: "center",
  },
  closeModalText: {
    fontSize: 16,
    color: "#007AFF",
  },
});

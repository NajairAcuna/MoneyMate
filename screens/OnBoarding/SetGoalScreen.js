import React, { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import stylesheet from 'react-native-web/dist/exports/StyleSheet';

const SetGoalScreen = ({navigation}) => {
    const [goalName, setGoalName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [targetDate, setTargetDate] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Set a financial goal</Text>
            <Text style={styles.title}>What are you saving for?</Text>
            <TextInput
            style={styles.input}
            placeholder="e.g. laptop"
            value={goalName}
            onChangeText={setGoalName}
            accessibilityLabel="Goal name input"
            />
            <Text style={styles.title}>How much do you want to save?</Text>
            <TextInput
            style={styles.input}
            placeholder="$0.00"
            value={goalAmount}
            onChangeText={setGoalAmount}
            accessibilityLabel='Goal amount input'
            />
            <Text style={styles.title}>When do you want to reach it?</Text>
            <TextInput
            style={styles.input}
            placeholder=' MM/DD/YYYY'
            value={targetDate}
            onChangeText={setTargetDate}
            accessibilityLabel='Target date input'
            />
            <TouchableOpacity
            title="Finish Setup"
              style={styles.button}
            onPress={()=>{
                console.log('Goal info:', {goalName, goalAmount, targetDate})
                navigation.navigate('Success')
            }}
            accessibilityLabel="Finish set up button"
            >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Finish set up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SetGoalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: "center",
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
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
}
})
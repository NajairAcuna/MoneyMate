import React from "react";
import { View, Text, StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import * as Progress from 'react-native-progress';

const HomeScreen = ({navigation})=>{
    const userName = 'Najair';
    const allowance = 15000;
    const spent = 7000;
    const goalName = 'car';
    const goalProgress = 0.30; //30%

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.greeting}>Hey, {userName}👋</Text>
            <Text style={styles.sectionTitle}>Your Budget</Text>
            <Text style={styles.budgetText}>You've spent {spent} of your {allowance} allowance.</Text>
            <Progress.Bar
                progress={spent/allowance}
                width={null}
                height={12}
                color='#4caf50'
                unfilledColor='#eee'
                borderRadius={6}
                style={styles.progress}
            />
            <Text style={styles.sectionTitle}>Goal: {goalName}</Text>
            <Text style={styles.budgetText}>You're 30% of the way there</Text>
            <Progress.Bar
                progress={goalProgress}
                width={null}
                height={12}
                color='#2196f3'
                unfilledColor="#eee"
                borderRadius={6}
                style={styles.progress}
            />
            <Text style={styles.tipTitle}>💡 Monte's Tip</Text>
            <Text style={styles.tipText}>Try bringing snacks from home to save 5$ a week!</Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Transactions')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>View Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Goals')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>View Goals</Text>
                </TouchableOpacity>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 48,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 4,
    },
    budgetText: {
        fontSize: 16,
        marginBottom: 8
    },
    progress: {
        marginBottom: 16,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 32,
        marginBottom: 8,
    },
    tipText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#444'
    },
    button: {
        backgroundColor: '#0078af',
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
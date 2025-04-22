import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <>
            <Text style={styles.title}>Welcome to MoneyMate</Text>
            <Text style={styles.subtitle}>Take control of your money, save for your goals, and have fun doing it!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            </>
        </View>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0078af',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


// import React from "react";
// import { View, Text} from 'react-native';

// const WelcomeScreen = () => {
//     return (
//         <View >
//             <Text>Welcome to the app</Text>
//         </View>
//     )
// }

// export default WelcomeScreen;
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/OnBoarding/WelcomeScreen';
import UserInfoScreen from './screens/OnBoarding/UserInfoScreen';
import SetGoalScreen from './screens/OnBoarding/SetGoalScreen';
import SuccessScreen from './screens/OnBoarding/SuccessScreen';
import HomeScreen from './screens/Dashboard/HomeScreen';
import TransactionsScreen from './screens/Transactions/TransactionsScreen';
import GoalsScreen from './screens/Goals/GoalsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='UserInfo'
          component={UserInfoScreen}
          options={{ title: 'Your Info' }}
          />
        <Stack.Screen
          name='SetGoal'
          component={SetGoalScreen}
          options={{ title: 'Set your goal' }}
          />
        <Stack.Screen
          name='Success'
          component={SuccessScreen}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
          name='Transactions'
          component={TransactionsScreen}
          options={{ title: 'Transactions'}}
        />
        <Stack.Screen
          name='Goals'
          component={GoalsScreen}
          options={{ title: 'Goals'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
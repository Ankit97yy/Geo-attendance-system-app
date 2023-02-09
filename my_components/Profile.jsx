import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BottomTabNavigator from './shared/BottomTabNavigator';

export default function Profile() {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator>
                <stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
                <stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
        </stack.Navigator>
    )
}

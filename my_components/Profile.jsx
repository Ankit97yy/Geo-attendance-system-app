import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './storeroom/HomeScreen';
import BottomTabNav from './BotttomTabNav';
import MarkAtttendance from './MarkAtttendance';
import Vict from './Victory';
import AppHeader from './AppHeader';
import { Provider as PaperProvider,MD3LightTheme } from 'react-native-paper';
export default function Profile() {
    const Stack = createNativeStackNavigator()
      const theme={
    ...MD3LightTheme,
    roundness:3,
    colors: {
      ...MD3LightTheme.colors,
    
    },
  };

    return (
        // <stack.Navigator>
        //         <stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
        //         <stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
        // </stack.Navigator>

        // <PaperProvider theme={theme}>
        <>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="BottomTabNav" component={BottomTabNav}/>
            <Stack.Screen name="vict" component={Vict}/>
            <Stack.Screen name="MarkAttendance" component={MarkAtttendance}/>
          </Stack.Navigator>
        </>
        // </PaperProvider>
    )
}

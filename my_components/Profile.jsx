import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './storeroom/HomeScreen';
import BottomTabNav from './BotttomTabNav';
import MarkAtttendance from './MarkAtttendance';
import Vict from './Victory';
import AppHeader from './AppHeader';
import { Provider as PaperProvider,MD3LightTheme } from 'react-native-paper';
import EmpWorkingHours from './EmpWorkingHours';
import AddEmployee from './AddEmployee';
import AddRequest from './AddRequest';
import { userDataContext } from '../contexts/SignedInContext';
import axios from 'axios';
import ApplyLeave from './ApplyLeave';
export default function Profile() {
    const Stack = createNativeStackNavigator()
      const theme={
    ...MD3LightTheme,
    roundness:3,
    colors: {
      ...MD3LightTheme.colors,
    
    },
  };
  const {userData}=useContext(userDataContext)
  axios.defaults.baseURL = "http://192.168.216.4:3001/";
  axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;

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
            <Stack.Screen options={{headerShown:true}} name="MarkAttendance" component={MarkAtttendance}/>
            <Stack.Screen name='EmpWorkingHours' component={EmpWorkingHours}/>
            <Stack.Screen options={{headerShown:true,headerTitle:'Apply Leave'}} name='ApplyLeave' component={ApplyLeave}/>
          </Stack.Navigator>
        </>
        // </PaperProvider>
    )
}

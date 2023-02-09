import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import SettingsScreen from '../SettingsScreen';
import Attendance from '../Attendance';
import GetCurrentLocation from '../GetCurrentLocation';


export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator screenOptions={{headerShown:false}}
     >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="GetCurrentLocation" component={GetCurrentLocation} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}
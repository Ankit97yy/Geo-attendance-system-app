import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View,Text,Platform} from 'react-native';
import FirstScreen from './my_components/FirstScreen';
import CreateAccount from './my_components/CreateAccount';
import LogIn from './my_components/LogIn';

const stack= createNativeStackNavigator()
export default function App() {
  return (
  <NavigationContainer>
    <stack.Navigator initialRouteName='FirstScreen'>
      <stack.Screen name='FirstScreen' component={FirstScreen} options={{title:'Geo Attendance'}}/>
      <stack.Screen name='CreateAccount' component={CreateAccount}/>
      <stack.Screen name='LogIn' component={LogIn}/>
    </stack.Navigator>
  </NavigationContainer>
)};
const styles = StyleSheet.create({
  main:{
    alignItems:'center',
    paddingTop:300
  },
  TextInput:{
    padding:10,
    margin:10,
    backgroundColor:"cyan",
    borderRadius:15,
    fontSize:20,
  }
});

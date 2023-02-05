import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import FirstScreen from './FirstScreen';
import CreateAccount from './CreateAccount';
import LogIn from './LogIn';
import ChooseLocation from './ChooseLocation';
import JoinOrRegister from './JoinOrRegister';
import OrganizationName from './OrganizationName';

export default function OutsideOfProfile() {
    const stack = createNativeStackNavigator()
    return (
        <stack.Navigator initialRouteName='FirstScreen'>
            <stack.Screen name='FirstScreen' component={FirstScreen} options={{ title: 'Geo Attendance' }} />
            <stack.Screen name='CreateAccount' component={CreateAccount} />
            <stack.Screen name='JoinOrRegister' component={JoinOrRegister}/>
            <stack.Screen name='OrganizationName' component={OrganizationName}/>
            <stack.Screen name='ChooseLocation' component={ChooseLocation}/>
            <stack.Screen name='LogIn' component={LogIn} />
        </stack.Navigator>
    )
}

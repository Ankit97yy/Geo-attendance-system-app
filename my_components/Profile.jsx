import React, { useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './BotttomTabNav';
import MarkAtttendance from './MarkAtttendance';
import Vict from './Victory';
import EmpWorkingHours from './EmpWorkingHours';
import { userDataContext } from '../contexts/SignedInContext';
import axios from 'axios';
import ApplyLeave from './ApplyLeave';
export default function Profile() {
    const Stack = createNativeStackNavigator()
   
  const {userData,setuserData}=useContext(userDataContext)
  axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;

  useEffect(() => {
  axios.get("employee/getLoggedInEmployee")
  .then(res=>{
    setuserData(prev=>{
      return{
        ...prev,
        fullName:res.data.name,
        branch_location_name:res.data.location_name,
        latitude:res.data.latitude,
        longitude:res.data.longitude
      }
    })
  })
  }, [])
  

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
            <Stack.Screen options={{headerShown:true,headerTitle:'Mark Attendance',headerTintColor:'white',headerStyle:{backgroundColor:'#0066ff'}}} name="MarkAttendance" component={MarkAtttendance}/>
            <Stack.Screen name='EmpWorkingHours' component={EmpWorkingHours}/>
            <Stack.Screen options={{headerShown:true,headerTitle:'Apply Leave',headerTintColor:'white',headerStyle:{backgroundColor:'#0066ff'}}} name='ApplyLeave' component={ApplyLeave}/>
          </Stack.Navigator>
        </>
        // </PaperProvider>
    )
}

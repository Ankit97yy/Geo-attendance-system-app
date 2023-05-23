import React, { useEffect, useContext, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './BotttomTabNav';
import MarkAtttendance from './MarkAtttendance';
import Vict from './Victory';
import EmpWorkingHours from './EmpWorkingHours';
import { userDataContext } from '../contexts/SignedInContext';
import axios from 'axios';
import ApplyLeave from './ApplyLeave';
import Settings from './Settings';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  try {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  } catch (error) {
    console.log("🚀 ~ file: Employees.jsx:41 ~ registerForPushNotificationsAsync ~ error:", error)
    
  }
  }

export default function Profile() {
    const Stack = createNativeStackNavigator()
    const notificationListener = useRef();
    const responseListener = useRef();
  const [notification, setNotification] = useState(false);

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
        longitude:res.data.longitude,
        profile_picture:res.data.profile_picture
      }
    })
    registerForPushNotificationsAsync().then(token => {
      axios.post("employee/savePushToken",{push_token:token})
      .then(()=>console.log("push token saved"))
      .catch(err=>console.log(err))
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
            <Stack.Screen options={{headerShown:true,headerTitle:'Mark Attendance',headerTintColor:'white',headerStyle:{backgroundColor:'#0088ff'}}} name="MarkAttendance" component={MarkAtttendance}/>
            <Stack.Screen name='EmpWorkingHours' component={EmpWorkingHours}/>
            <Stack.Screen options={{headerShown:true,headerTitle:'Apply Leave',headerTintColor:'white',headerStyle:{backgroundColor:'#0088ff'}}} name='ApplyLeave' component={ApplyLeave}/>
            <Stack.Screen options={{headerShown:true,headerTitle:'Settings',headerTintColor:'white',headerStyle:{backgroundColor:'#0088ff'}}} name='Settings' component={Settings}/>
            <Stack.Screen options={{headerShown:true,headerTitle:'Change Password',headerTintColor:'white',headerStyle:{backgroundColor:'#0088ff'}}} name='ChangePassword' component={ChangePassword}/>
            <Stack.Screen options={{headerShown:true,headerTitle:'Change Password',headerTintColor:'white',headerStyle:{backgroundColor:'#0088ff'}}} name='ChangeEmail' component={ChangeEmail}/>
          </Stack.Navigator>
        </>
        // </PaperProvider>
    )
}

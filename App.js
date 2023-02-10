import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import { signedInContext } from './contexts/SignedInContext';
import Profile from './my_components/Profile';
import OutsideOfProfile from './my_components/OutsideProfile/OutsideOfProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

export default function App() {
  const [isSignedIn, setisSignedIn] = useState(null)
  var first='ankit'


  useEffect(() => {
    console.log("one");
    const isSignedInStore = async () => {
      try {
        console.log("two");
        const value = await AsyncStorage.getItem('isSignedIn');
        console.log(value, "value");
        if (value === 'true') setisSignedIn(true)
        else setisSignedIn(false)
      } catch (error) {

      }
    }
    isSignedInStore();
    console.log("four");
  }, [])

  console.log("five");

  if(isSignedIn===null) return <View/>

  return (
    <NavigationContainer>
      <signedInContext.Provider value={{ isSignedIn, setisSignedIn,first }}>
        {console.log("hahaha")}

        {isSignedIn ?
          <>
            <Profile />
          </>
          :
          <OutsideOfProfile />
        }
      </signedInContext.Provider>
    </NavigationContainer>
    // <GetCurrentLocation/>

  )
};


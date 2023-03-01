import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import { signedInContext } from './contexts/SignedInContext';
import Profile from './my_components/Profile';
import OutsideOfProfile from './my_components/OutsideProfile/OutsideOfProfile';
import { ActivityIndicator, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {SECRET_KEY} from "@env"
import SearchScreen from './my_components/Searchscreen';
import LoginSuccModal from './my_components/OutsideProfile/LoginSuccModal';

export default function App() {
  const [isSignedIn, setisSignedIn] = useState(null)
  useEffect(() => {
    async function getToken(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log(result);
      setisSignedIn(true)
      } 
      else {
        console.log('No values stored under that key.');
        setisSignedIn(false)
      }
    }
    getToken(SECRET_KEY)
  }, [])


  if(isSignedIn===null) return <ActivityIndicator animating={true} />

  return (
    <NavigationContainer>
      <signedInContext.Provider value={{ isSignedIn, setisSignedIn}}>
        {isSignedIn ?
          <>
            <Profile />
          </>
          :
          <OutsideOfProfile />
        }
      </signedInContext.Provider>
    </NavigationContainer>
    // <OrganizationName/>
    
  )
};


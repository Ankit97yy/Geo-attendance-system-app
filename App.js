import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect,use} from 'react';
import { useFonts } from 'expo-font';
import { signedInContext } from './contexts/SignedInContext';
import Profile from './my_components/Profile';
import OutsideOfProfile from './my_components/OutsideProfile/OutsideOfProfile';
import { ActivityIndicator, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import {SECRET_KEY} from "@env"
import { MD3LightTheme,Provider as PaperProvider } from 'react-native-paper';
import AppHeader from './my_components/AppHeader';

export default function App() {
  const [isSignedIn, setisSignedIn] = useState(true)
  // useEffect(() => {
  //   async function getToken(key) {
  //     let result = await SecureStore.getItemAsync(key);
  //     if (result) {
  //       console.log(result);
  //     setisSignedIn(true)
  //     } 
  //     else {
  //       console.log('No values stored under that key.');
  //       setisSignedIn(false)
  //     }
  //   }
  //   getToken(SECRET_KEY)
  // }, [])


  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/InterDesktop/Inter-Regular.otf'),
    'Inter-Medium': require('./assets/fonts/InterDesktop/Inter-Medium.otf'),
  });

  async function loadfont(){
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }
loadfont();
  if (!fontsLoaded) {
    return null;
  }

   const theme={
    ...MD3LightTheme,
    roundness:3,
    colors: {
      ...MD3LightTheme.colors,
    
    },
  };

  if(isSignedIn===null) return <ActivityIndicator animating={true} />

  return (
    <NavigationContainer>
      <signedInContext.Provider value={{ isSignedIn, setisSignedIn}}>
        <PaperProvider theme={theme}>

        {isSignedIn ?
          <>
          <AppHeader/>
            <Profile />
          </>
            
            :
            <OutsideOfProfile />
          }
          </PaperProvider>
      </signedInContext.Provider>
    </NavigationContainer>
    // <OrganizationName/>
    
  )
};


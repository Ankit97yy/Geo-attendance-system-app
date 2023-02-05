import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { signedInContext } from './contexts/SignedInContext';
import Profile from './my_components/Profile';
import OutsideOfProfile from './my_components/OutsideOfProfile';

export default function App() {
  const [isSignedIn, setisSignedIn] = useState(false)

  return (
    <NavigationContainer>
      <signedInContext.Provider value={{ isSignedIn, setisSignedIn }}>
        {isSignedIn ?
          <Profile />
          :
          <OutsideOfProfile />
        }
      </signedInContext.Provider>
    </NavigationContainer>
  )
};


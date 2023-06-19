import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, use } from "react";
import { useFonts } from "expo-font";
import { userDataContext } from "./contexts/SignedInContext";
import Profile from "./my_components/Profile";
import OutsideOfProfile from "./my_components/OutsideProfile/OutsideOfProfile";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { SECRET_KEY } from "@env";
import { MD3LightTheme, Provider as PaperProvider, Snackbar } from "react-native-paper";
import 'intl';
import 'intl/locale-data/jsonp/en';
import axios from "axios";
import { colors } from "./my_components/coolrs";
import { socket } from "./my_components/SocketConn";
import NetInfo from '@react-native-community/netinfo';


// import AppHeader from './my_components/AppHeader';
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

export default function App() {
  axios.defaults.baseURL = "http://192.168.251.4:3001/";
  const [userData, setuserData] = useState({
    fullName: "",
    branch_location_name: "",
      latitude:0,
      longitude:0,
    isSignedIn: false,
    accessToken:null,
    profile_picture:""
  });

  const [isOffline, setisOffline] = useState(false)
  useEffect(() => {
    async function getToken(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log(result);
        setuserData((prev) => {
          return { ...prev,accessToken:result, isSignedIn: true };
        });
      } else {
        console.log("No values stored under that key.");
        setuserData((prev) => {
          return { ...prev, isSignedIn: false };
        });
      }
    }
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected) setisOffline(true)
    });
    getToken(SECRET_KEY);
    return ()=>unsubscribe();
  }, []);

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/InterDesktop/Inter-Regular.otf"),
    "Inter-Medium": require("./assets/fonts/InterDesktop/Inter-Medium.otf"),
  });

  async function loadfont() {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }
  loadfont();
  if (!fontsLoaded) {
    return null;
  }

  const theme = {
    ...MD3LightTheme,
    roundness: 3,
    colors:colors
  };

  if (userData.isSignedIn === null) return <ActivityIndicator animating={true} />;
  if(isOffline) return (
    <Snackbar
    visible={true}
    // onDismiss={onDismissSnackBar}
    action={{
      label: 'Undo',
      onPress: () => {
        // Do something
      },
    }}>
    You are currently offline
  </Snackbar>
  )
  return (
    <NavigationContainer>
      <userDataContext.Provider value={{userData, setuserData }}>
        <PaperProvider theme={theme}>
          {userData.isSignedIn ? (
            <>
              <Profile />
              {/* <ApplyLeave/> */}
            </>
          ) : (
            <OutsideOfProfile />
          )}
      {/* <StatusBar style="light" translucent /> */}

        </PaperProvider>
      </userDataContext.Provider>
    </NavigationContainer>
  );
}

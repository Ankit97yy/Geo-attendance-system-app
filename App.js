import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect, use } from "react";
import { useFonts } from "expo-font";
import { userDataContext } from "./contexts/SignedInContext";
import Profile from "./my_components/Profile";
import OutsideOfProfile from "./my_components/OutsideProfile/OutsideOfProfile";
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { SECRET_KEY } from "@env";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import 'intl';
import 'intl/locale-data/jsonp/en';
// import AppHeader from './my_components/AppHeader';

export default function App() {
  const [userData, setuserData] = useState({
    fullName: "",
    id: null,
    branch_location_id: null,
    isSignedIn: false,
    accessToken:null
  });
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
    getToken(SECRET_KEY);
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
    colors: {
      ...MD3LightTheme.colors,
      primary:'navy'
    },
  };

  if (userData.isSignedIn === null) return <ActivityIndicator animating={true} />;

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
        </PaperProvider>
      </userDataContext.Provider>
    </NavigationContainer>
    // <OrganizationName/>
  );
}

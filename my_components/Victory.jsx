import { React, useContext, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as SecureStore from "expo-secure-store";
// import { SafeAreaView, FlatList, StatusBar } from "react-native";
import { Chip, List, Surface } from "react-native-paper";
import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Button } from "react-native-paper";
import AppHeader from "./AppHeader";
import { SECRET_KEY } from "@env";
import { userDataContext } from "../contexts/SignedInContext";

SplashScreen.preventAutoHideAsync();
export default function Vict({ navigation }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const MONTH_WIDTH = 50;

  const { setuserData } = useContext(userDataContext);
  const scrollViewRef = useRef();

  const months = [
    "January",
    "february",
    "march",
    "April",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const Item = ({ title }) => (
    <View>
      <Button
        onPress={() => setSelectedMonth(title)}
        labelStyle={{
          fontWeight: selectedMonth === title ? "bold" : "normal",
          textDecorationLine: selectedMonth === title ? "underline" : "none",
          fontSize: selectedMonth === title ? 17 : 15,
        }}
      >
        {title}
      </Button>
    </View>
  );

  const MyComponent = () => (
    // <List.Item
    //   title="First Item"
    //   description="Item description"
    //   left={props => <List.Icon {...props} icon="folder" />}
    // />
    <Surface style={{ height: 100, marginBottom: 15,flexDirection:'row',alignItems:'center',justifyContent:'space-around' }}>
      <View style={{backgroundColor:'',justifyContent:'center',width:50,alignItems:'center'}}>
        <Text style={{fontSize:17,fontWeight:"bold"}}>06</Text>
        <Text style={{fontSize:17,fontWeight:"bold"}}>Sun</Text>
      </View>
        <View style={{}}>
          <Text style={{fontSize:17,alignSelf:'center'}}>09:00 am</Text>
          <Chip style={{}} mode="outlined" icon="clock-in">Punch In</Chip>
      </View>
        <View style={{justifyContent:'center'}}>
          <Text style={{fontSize:17,alignSelf:'center'}}>12:09 pm</Text>
          <Chip mode="outlined" icon="clock-out">Punch Out</Chip>
      </View>
    </Surface>
  );

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/InterDesktop/Inter-Medium.otf"),
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

  const handLogout = async () => {
    await SecureStore.deleteItemAsync(SECRET_KEY);
    setuserData((prev) => {
      return {
        fullName: "",
        id: null,
        branch_location_id: null,
        isSignedIn: false,
        accessToken: null,
      };
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          mode="contained"
          style={{ marginHorizontal: 10, marginVertical: 5 }}
          labelStyle={{ fontFamily: "Inter-Medium", fontSize: 16 }}
          buttonColor="navy"
          onPress={() => navigation.navigate("MarkAttendance")}
        >
          Mark Attendance
        </Button>
        <Button
          style={{ marginHorizontal: 10, marginVertical: 5 }}
          labelStyle={{ fontFamily: "Inter-Medium", fontSize: 16 }}
          mode="contained"
          buttonColor="navy"
          onPress={() => navigation.navigate("ApplyLeave")}
        >
          Apply Leave
        </Button>
      </View>
      <FlatList
        data={months}
        contentContainerStyle={{ height: 40 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={(item) => item}
      />
      {/* <View><Text>aa</Text></View> */}
      <FlatList
        data={months}
        // horizontal
        renderItem={({ item }) => <MyComponent />}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  labels: {},
});

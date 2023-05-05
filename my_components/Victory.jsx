import { React, memo, useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import * as SecureStore from "expo-secure-store";
// import { SafeAreaView, FlatList, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { FAB } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { Button } from "react-native-paper";
import AppHeader from "./AppHeader";
import { SECRET_KEY } from "@env";
import { userDataContext } from "../contexts/SignedInContext";
import { DateTime } from "luxon";
import axios from "axios";
import AttendanceList2 from "./AttendanceList2";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setStatusBarStyle } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();
export default function Vict({ navigation }) {
  setStatusBarStyle("light");
  const { setuserData, userData } = useContext(userDataContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDate, setcurrentDate] = useState(DateTime.now());
  const [selectedMonth, setSelectedMonth] = useState({
    month: "April",
    id: "04",
  });
  const [attendance, setattendance] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("attendance/getAttendance", {
        cancelToken:source.token,
        params: {
          startDate: `${currentDate.startOf('month').toFormat('yyyy-MM-dd')}`,
          endDate: `${currentDate.endOf('month').toFormat('yyyy-MM-dd')}`,
        },
      })
      .then((res) => setattendance(res.data))
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.log('Error:', error.message);
        }
      });

      return ()=>source.cancel('user cancelled the request')
  }, [currentDate]);
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
        isSignedIn: false,
        accessToken: null,
      };
    });
  };

  const handleConfirm = (date) => {
    let dt=DateTime.fromJSDate(date)
    setcurrentDate(dt)
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const Item = ({ title }) => (
    <View style={{ marginLeft: 5 }}>
      <Button
        mode={selectedMonth.id === title.id ? "contained-tonal" : "outlined"}
        onPress={() => setSelectedMonth(title)}
        style={{ borderRadius: 5 }}
        buttonColor={selectedMonth.id === title.id ? "#0066ff" : "white"}
        labelStyle={{
          // fontWeight: selectedMonth.id === title.id ? "bold" : "normal",
          // textDecorationLine:
          //   selectedMonth.id === title.id ? "underline" : "none",
          fontSize: selectedMonth.id === title.id ? 17 : 15,
          color: selectedMonth.id === title.id ? "white" : "black",
          fontFamily: "Inter-Black",
        }}
      >
        {title.month}
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader />
      <DateTimePickerModal
        min
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date(2050,12,30)}
        />
      {/* <WelcomeScreen/> */}
      <FAB
        icon="fingerprint"
        size="medium"
        style={styles.fab}
        color="white"
        onPress={() => navigation.navigate("MarkAttendance")}
      />

      {/* <View style={{borderColor:'grey',backgroundColor:'white',padding:5,marginBottom:5}}>
      <FlatList
        data={months}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={(item) => item.id}
        />
        </View> */}
      <View
        style={{
          borderColor: "grey",
          backgroundColor: "white",
          padding: 5,
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button icon="chevron-left-circle" onPress={()=>{
          setcurrentDate(prev=>prev.minus({month:1}))
        }}></Button>
        <Button buttonColor="#f5f5f5" icon="calendar-month" onPress={()=>setDatePickerVisibility(true)}>{currentDate.toLocaleString({month:'long',year:'2-digit'})}</Button>
        <Button icon="chevron-right-circle" onPress={()=>setcurrentDate(prev=>prev.plus({month:1}))}></Button>
      </View>

      {
        attendance.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
            }}
          >
            <Text style={{ fontSize: 20 }}>No Records</Text>
          </View>
        ) : (
          // <View style={{backgroundColor:"yellow",flex:1}}>

          <AttendanceList2 attendance={attendance} />
        )
        // </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "#0088ff",
  },
});

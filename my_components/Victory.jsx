import { React,useCallback,useContext ,useState } from "react";
import { StyleSheet, View, } from "react-native";
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
import AttendanceList2 from "./AttendanceList2";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { setStatusBarStyle } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();
export default function Vict({ navigation }) {
  setStatusBarStyle("light");
  const { setuserData, userData } = useContext(userDataContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDate, setcurrentDate] = useState(DateTime.now());

 

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
    let dt = DateTime.fromJSDate(date);
    setcurrentDate(dt);
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date(2050, 12, 30)}
      />
      {/* <FAB
        icon="google-maps"
        size="medium"
        style={styles.fab}
        color="white"
        onPress={() => navigation.navigate("MarkAttendance")}
      /> */}
      {/* <Surface style={{backgroundColor:'white',marginVertical:5}} >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button mode="contained">Punch in</Button>
          <Button mode="contained">Punch out</Button>
        </View>
      </Surface> */}
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
        <Button
          icon="chevron-left-circle"
          onPress={() => {
            setcurrentDate((prev) => prev.minus({ month: 1 }));
          }}
        ></Button>
        <Button
          buttonColor="#f5f5f5"
          icon="calendar-month"
          onPress={() => setDatePickerVisibility(true)}
        >
          {currentDate.toLocaleString({ month: "long", year: "2-digit" })}
        </Button>
        <Button
          icon="chevron-right-circle"
          onPress={() => setcurrentDate((prev) => prev.plus({ month: 1 }))}
        ></Button>
      </View>
      <AttendanceList2 currentDate={currentDate} />
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

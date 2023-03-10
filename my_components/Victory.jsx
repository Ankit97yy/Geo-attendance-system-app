import { React, useCallback } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { VictoryPie, VictoryChart, VictoryTheme } from "victory-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Good from "./Good";
import AttendanceList from "./AttendanceList";
import Hello from "./Hello";
import { Button } from "react-native-paper";
const data1 = [
  { x: "Present", y: 78 },
  { x: "Absent", y: 20 },
  { x: "On leave", y: 2 },
];
const data2 = [
  { x: "leaves taken", y: 78 },
  { x: "remaining", y: 20 },
];

SplashScreen.preventAutoHideAsync();
export default function Vict({navigation}) {
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.chart}>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontFamily: "Inter-Medium",
              // bottom: 137,
              left:10,
              position: "absolute",
              marginLeft: 26,
              // fontWeight:'bold'
            }}
          >
            Attendance
          </Text>
          <View>
            <VictoryPie
              colorScale={["navy", "tomato", "orange"]}
              labels={()=>""}
              data={data1}
              innerRadius={40}
              padAngle={3}
              width={200}
              origin={{ x: 75 }}
              style={{
                labels: {
                  fill: "black",
                  fontSize: 16,
                  fontWeight: "bold",
                },
              }}

            />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 17,
                color: "navy",
                fontFamily: "Inter-Black",
              }}
            >
              Present: 78
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: "tomato",
                fontFamily: "Inter-Black",
              }}
            >
              Absent: 20
            </Text>
            <Text
              style={{ fontSize: 17, color: "orange", fontFamily: "Inter-Black" }}
            >
              On leave: 2
            </Text>
          </View>
        </View>
        <View style={styles.chart}>
               <Text
            style={{
              fontSize: 14,
              color: "black",
              fontFamily: "Inter-Medium",
              left:26,
              position: "absolute",
              marginLeft: 26,
              // fontWeight:'bold'
            }}
          >
            Leaves
          </Text>
          <View>
            <VictoryPie
              colorScale={["tomato", "navy"]}
              labels={() => ""}
              data={data2}
              innerRadius={40}
              padAngle={3}
              width={200}
              origin={{ x: 75 }}
              // height={100}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 17,
                color: "tomato",
                fontFamily: "Inter-Black",
                fontWeight: "100",
              }}
              >
              Taken: 78{" "}
            </Text>
            <Text
              style={{ fontSize: 17, color: "navy", fontFamily: "Inter-Black" }}
            >
              Remaining: 20
            </Text>
          </View>
        </View>
        {/* <Good /> */}
        {/* <AttendanceList/> */}
                <Button
                mode="contained"
                style={{marginHorizontal:10,marginVertical:5}}
                labelStyle={{fontFamily:'Inter-Medium',fontSize:16}}
                buttonColor='navy'
                onPress={()=>navigation.navigate("MarkAttendance")}
                >
                  Mark Attendance
                </Button>
        <Hello/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  chart: {
    backgroundColor: "white",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",

    marginHorizontal:10,
    marginVertical:5,
    // backgroundColor:'powderblue',
    height: 150,
    // elevation:5,
    borderRadius: 15,
    // borderWidth:0.5
    elevation: 5,
  },
  labels:{

  }
});

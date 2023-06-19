import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import axios from "axios";
import { DateTime } from "luxon";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Button, Divider, Surface } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function EmpProfile() {
  const [currentDate, setcurrentDate] = useState(DateTime.now());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [attendance, setattendance] = useState([]);
  const [remainingLeaves, setremainingLeaves] = useState(null);
  const [data, setdata] = useState([]);
  const fetchdata = (source) => {
    axios
      .get("attendance/getAttendance", {
        cancelToken: source.token,
        params: {
          startDate: `${currentDate.startOf("month").toFormat("yyyy-MM-dd")}`,
          endDate: `${currentDate.endOf("month").toFormat("yyyy-MM-dd")}`,
        },
      })
      .then((res) => {
        let data = [];
        res.data.map((item) => {
          if (item.in_time === null || item.out_time === null) hour = 0;
          else {
            let in_time = DateTime.fromFormat(item.in_time, "HH:mm:ss");
            let out_time = DateTime.fromFormat(item.out_time, "HH:mm:ss");
            var hour = out_time.diff(in_time, "minutes").minutes / 60;
          }
          // console.log("🚀 ~ file: WorkingHours.jsx:74 ~ .then ~ hour:", hour);
          let date = DateTime.fromISO(item.date).toLocaleString({
            day: "numeric",
            // month: "short",
          });
          data.push({ date: date, hours: hour });
        });
        data.reverse()
        setdata(data);
        setattendance(res.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log("Error:", error.message);
        }
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchdata(source);
    axios
      .get("leave/getRemainingLeaves")
      .then((res) => setremainingLeaves(res.data))
      .catch((err) => console.log(err));
    return () => source.cancel("user cancelled the request");
  }, [currentDate]);
  // const data = [
  //   { quarter: 1, earnings: 13000 },
  //   { quarter: 2, earnings: 16500 },
  //   { quarter: 3, earnings: 14250 },
  //   { quarter: 4, earnings: 19000 },
  // ];
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
      <View style={{ marginHorizontal: 5 }}>
        <Surface
          style={{
            backgroundColor: "white",
            marginBottom: 5,
            borderRadius: 5,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18, alignSelf: "center",fontFamily:'Inter-Black' }}>
            Remaining Leaves
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "#0088ff",fontFamily:'Inter-Black' }}>Annual</Text>
              <Text style={{ fontSize: 17,fontFamily:'Inter-Black' }}>{remainingLeaves?.annual}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "tomato" ,fontFamily:'Inter-Black'}}>Sick</Text>
              <Text style={{ fontSize: 17 ,fontFamily:'Inter-Black'}}>{remainingLeaves?.sick}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "orange",fontFamily:'Inter-Black' }}>Casual</Text>
              <Text style={{ fontSize: 17 ,fontFamily:'Inter-Black'}}>{remainingLeaves?.casual}</Text>
            </View>
          </View>
        </Surface>
        <Surface
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            marginVertical: 5,
          }}
        >
          <View
            style={{
              borderRadius: 5,
              // borderColor: "grey",
              backgroundColor: "white",
              padding: 5,
              // marginBottom: 5,
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
          {/* <Surface style={{ backgroundColor: "white" }}> */}
          <Text style={{ fontSize: 18, alignSelf: "center",fontFamily:"Inter-Black" }}>
            Working Hours
          </Text>
          {data.length===0?(
            <View style={{height:350,justifyContent:'center',alignItems:"center"}}>
              <Text style={{fontFamily:'Inter-Black',fontSize:18}}>No records to show</Text>
            </View>
          ):(
          <VictoryChart width={370} theme={VictoryTheme.material}>
            <VictoryBar barWidth={15} data={data} x="date" y="hours" />
          </VictoryChart>
          )}
        </Surface>
        <Surface style={{backgroundColor:'white'}}>
          <Text style={{ fontSize: 20, alignSelf: "center",fontFamily:"Inter-Black"}}>
            Total Attendance
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "#0088ff",fontFamily:"Inter-Black"}}>Present</Text>
              <Text style={{ fontSize: 17 }}>
                {attendance.filter((item) => item.status === "present").length}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}></View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "tomato",fontFamily:"Inter-Black"}}>Absent</Text>
              <Text style={{ fontSize: 17 }}>
                {attendance.filter((item) => item.status === "absent").length}
              </Text>
            </View>
          </View>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

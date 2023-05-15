import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import axios from "axios";
import { DateTime } from "luxon";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Button, Surface } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function EmpProfile() {
  const [currentDate, setcurrentDate] = useState(DateTime.now());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [attendance, setattendance] = useState([]);
  console.log("🚀 ~ file: EmpProfile.jsx:13 ~ EmpProfile ~ attendance:", attendance)
  const [data, setdata] = useState([])
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
            month: "short",
          });
          data.push({date:date,hours:hour})
        });
        setdata(data)
        setattendance(res.data)
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Surface
          style={{
            width: "45%",
            height: 150,
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          <Text>
            Present:{attendance.filter((item) => item.status === "present").length}
          </Text>
        </Surface>
        <Surface
          style={{
            width: "45%",
            height: 150,
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          <Text>Absent:{attendance.filter((item) => item.status === "absent").length}</Text>
        </Surface>
      </View>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="date" y="hours" />
      </VictoryChart>
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

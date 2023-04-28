import { View, Text, StyleSheet, ScrollView } from "react-native";
import React,{useState,useEffect} from "react";
import {
  Button,
  Avatar,
  FAB,
  MD3LightTheme,
  DataTable,
} from "react-native-paper";
import AttendanceList from "./AttendanceList";
import axios from "axios";

export default function Hello() {
  const [attendance, setattendance] = useState([]);
  console.log("🚀 ~ file: Hello.jsx:15 ~ Hello ~ attendance:", attendance)
  useEffect(() => {
    axios
      .get("attendance/getAttendance")
      .then((res) => setattendance(res.data))
      .catch((err) => {
        console.log("🚀 ~ file: Hello.jsx:21 ~ useEffect ~ err:", err)
      })
  }, []);
// console.log(attendance,"******")
  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
        <View style={styles.attendanceContainer}>
          <AttendanceList />
          {/* <DataTable style={{}}>
      <DataTable.Header>
        <DataTable.Title textStyle={styles.header}>Name</DataTable.Title>
        <DataTable.Title textStyle={styles.header}>Status</DataTable.Title>
        <DataTable.Title textStyle={styles.header}>In-time</DataTable.Title>
        <DataTable.Title textStyle={styles.header}>Out-Time</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell textStyle={styles.text}>Ankit</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >Present</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >09:30</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >19:30</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{}}>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.absent} >Absent</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >-</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >-</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >Present</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >09:20</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >19:20</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.absent} >Absent</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >-</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >-</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >Present</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >09:20</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >19:20</DataTable.Cell>
      </DataTable.Row>
    </DataTable> */}
          <DataTable>
            <DataTable.Header>
        <DataTable.Title textStyle={styles.header}>Name</DataTable.Title>
        <DataTable.Title textStyle={styles.header}>Status</DataTable.Title>
        <DataTable.Title textStyle={styles.header}>In-time</DataTable.Title>
        <DataTable.Title textStyle={styles.header}>Out-Time</DataTable.Title>
      </DataTable.Header>
      {attendance.map((item)=>{
        return(
        <DataTable.Row key={item.id}>
          <DataTable.Cell textStyle={styles.text}>{item.full_name}</DataTable.Cell>
        <DataTable.Cell style={{flexWrap:'wrap'}} textStyle={item.status==='present'?styles.text:styles.absent} >{item.status}</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >{item.in_time===null?"-":item.in_time}</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >{item.out_time===null?"-":item.out_time}</DataTable.Cell>
        </DataTable.Row>
        )
      })}
          </DataTable>
        </View>
        {/* <Good/> */}
      {/* </ScrollView> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f3f2",
    // alignItems: 'center'
  },
  dashboard: {
    padding: 15,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    margin: 10,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: "Inter-Black",
    // fontWeight:'bold',
    // color:'grey'
  },
  header: {
    fontSize: 16,
    fontFamily: "Inter-Black",
    fontWeight: "bold",
  },
  number: {
    fontSize: 20,
  },
  attendanceContainer: {
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    padding: 15,
    margin: 10,
    elevation: 5,
  },
  absent: {
    color: "red",
    fontSize: 16,
    fontFamily: "Inter-Black",
    textShadowColor: "red",
    textShadowRadius: 0.3,
  },
});

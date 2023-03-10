import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Button, Avatar, FAB,MD3LightTheme,DataTable } from "react-native-paper";
import Good from "./Good";
import AttendanceList from "./AttendanceList";

export default function Hello() {
  return (
    <View style={styles.container}>
      <ScrollView>

      <View style={styles.attendanceContainer}>
        <AttendanceList/>
        <DataTable style={{}}>
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

      <DataTable.Row style={{backgroundColor:'#ea4d3f70',borderRadius:15}}>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >Absent</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >09:20</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >19:20</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >Present</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >09:20</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >19:20</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={{backgroundColor:'#ea4d3f70',borderRadius:15}}>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >Absent</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >09:20</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >19:20</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={styles.text}>Arijeet</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >Present</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >09:20</DataTable.Cell>
        <DataTable.Cell textStyle={styles.text} >19:20</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
      </View>
      {/* <Good/> */}
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f4f3f2'
    // alignItems: 'center'
  },
  dashboard:{
    padding:15,
    backgroundColor:'#f7f7f7',
    borderRadius:15,
    margin:10,
    elevation:4,
  },
  text:{
    fontSize:16,
    fontFamily:'Inter-Black',
    // fontWeight:'bold',
    // color:'grey'
  },
  header:{
    fontSize:16,
    fontFamily:'Inter-Black',
    fontWeight:'bold',

  },
  number:{
    fontSize:20
  },
  attendanceContainer:{
    backgroundColor:'#f7f7f7',
    borderRadius:15,
    padding:15,
    margin:10,
  elevation:5
  }
});

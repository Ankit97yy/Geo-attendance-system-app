import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import {Appbar, Avatar} from "react-native-paper";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryPie,
} from "victory-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, DataTable, Surface } from "react-native-paper";
import {Provider} from "react-native-paper";
export default function EmpWorkingHours() {
  //   const [date, setDate] = useState(new Date());

  //   const handleDateChange = (newDate) => {
  //     setDate(newDate);
  //   };

  //   const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());

  //   const endOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - date.getDay()));

  //   return (
  //     <View style={styles.container}>
  //       <DatePickerIOS
  //         date={date}
  //         onDateChange={handleDateChange}
  //         mode="date"
  //       />
  //       <View style={styles.weekContainer}>
  //         <Text style={styles.weekText}>Start of week: {startOfWeek.toLocaleDateString()}</Text>
  //         <Text style={styles.weekText}>End of week: {endOfWeek.toLocaleDateString()}</Text>
  //       </View>
  //     </View>
  //   );
  // }
  const data2 = [
    { x: "leaves taken", y: 78 },
    { x: "remaining", y: 20 },
    {x:"pending",y:1}
  ];

  return (
  <Provider>
    <Appbar.Header>
      <Avatar.Text label="AKD" size={38} style={{marginLeft:5}}/>
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:5}}>
      <View>
      <Text style={{ fontSize: 20 }}>Arijeet Kumar Das</Text>
      <Text>Branch: Paltan Bazaar</Text>
      </View>
      <MaterialCommunityIcons name="pencil" size={25}/>
      </View>
    </Appbar.Header>
    <ScrollView>
      <Surface
        style={{
          marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: "white",
          // height:300
        }}
      >
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
        <Text style={{fontSize:18,fontFamily:'Inter-Medium',top:10}}>Working Hours</Text>
        <Button mode="outlined" style={{ alignSelf: "center" }}>
          Select Week
        </Button>
        </View>
        <VictoryChart
          //   theme={VictoryTheme.material}
          domainPadding={35}
        >
          <VictoryAxis
            style={{}}
            // set the name for the x-axis
            //   label="Days"
          />
          <VictoryAxis
            dependentAxis
            // set the name for the y-axis
            label="Hours"
          />
          <VictoryBar
            style={{ data: { fill: "navy" } }}
            data={[
              { x: "Mon", y: 5 },
              { x: "Tue", y: 4 },
              { x: "Wed", y: 5 },
              { x: "Thu", y: 6 },
              { x: "Fri", y: 2.5 },
              { x: "Sat", y: 5 },
            ]}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </VictoryChart>
      </Surface>
        <View style={styles.chart}>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontFamily: "Inter-Medium",
              left: 26,
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
              <Text
              style={{ fontSize: 17, color: "orange", fontFamily: "Inter-Black" }}
            >
              Pending: 1
            </Text>
          </View>
        </View>


      <Surface
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          borderRadius: 10,
          marginVertical: 5,
        }}
        >
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={styles.header}>Status</DataTable.Title>
            <DataTable.Title textStyle={styles.header}>In-time</DataTable.Title>
            <DataTable.Title textStyle={styles.header}>
              Out-Time
            </DataTable.Title>
            <DataTable.Title textStyle={styles.header}>Date</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell textStyle={styles.text}>Present</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>09:30</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>19:30</DataTable.Cell>
            <DataTable.Cell>2023-03-06</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row
            style={{ backgroundColor: "#ea4d3f70", borderRadius: 15 }}
          >
            <DataTable.Cell textStyle={styles.text}>Absent</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>-</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>-</DataTable.Cell>
            <DataTable.Cell>2023-03-07</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell textStyle={styles.text}>Present</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>09:20</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>19:20</DataTable.Cell>
            <DataTable.Cell>2023-03-08</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row
            style={{ backgroundColor: "#ea4d3f70", borderRadius: 15 }}
            >
            <DataTable.Cell textStyle={styles.text}>Absent</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>-</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>-</DataTable.Cell>
            <DataTable.Cell>2023-03-09</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell textStyle={styles.text}>Present</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>09:20</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>19:20</DataTable.Cell>
            <DataTable.Cell>2023-03-11</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Surface>
      <Surface></Surface>
            </ScrollView>
      </Provider>
    
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
  },
  text: {
    fontSize: 15,
    fontFamily: "Inter-Black",
  },
  chart: {
    backgroundColor: "white",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",

    marginHorizontal: 10,
    marginVertical: 5,
    // backgroundColor:'powderblue',
    height: 150,
    // elevation:5,
    borderRadius: 15,
    // borderWidth:0.5
    elevation: 5,
  },
});

import axios from "axios";
import { DateTime } from "luxon";
import React, { memo, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Surface } from "react-native-paper";

function AttendanceList2({ currentDate }) {
  const [loading, setloading] = useState(false);
  const [attendance, setattendance] = useState([]);
  const fetchdata = (source) => {
    console.log("fetch");
    axios
      .get("attendance/getAttendance", {
        cancelToken: source?.token,
        params: {
          startDate: `${currentDate.startOf("month").toFormat("yyyy-MM-dd")}`,
          endDate: `${currentDate.endOf("month").toFormat("yyyy-MM-dd")}`,
        },
      })
      .then((res) => setattendance(res.data))
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log("Error:", error.message);
        }
      });
  };
  useEffect(() => {
    console.log("rendered")
    const source = axios.CancelToken.source();
    fetchdata(source);

    return () => source.cancel("user cancelled the request");
  }, [currentDate]);

  const RenderList = memo(({ data }) => {
    const dateObject = DateTime.fromISO(data.date);
    const date = dateObject.toFormat("dd");
    console.log("🚀 ~ file: AttendanceList2.jsx:18 ~ RenderList ~ date:", date);
    const day = dateObject.toFormat("ccc");
    const punchIn =
      data.status === "present"
        ? DateTime.fromFormat(data.in_time, "HH:mm:ss").toFormat("t")
        : "";
    const punchOut =
      data.status === "present" && data.out_time !== null
        ? DateTime.fromFormat(data.out_time, "HH:mm:ss").toFormat("t")
        : ""; //! handle null out_time
    // const bgColor=
    return (
      <Surface
        // elevation={3}
        style={{
          height: 100,
          marginBottom: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 10,
          marginHorizontal: 5,
          backgroundColor: data.status === "present" ? "white" : "white",
        }}
      >
        <View
          style={{
            backgroundColor:
              data.status === "present" ? "#ededed" : "#f9040470",
            justifyContent: "center",
            width: 50,
            alignItems: "center",
            // borderColor:'black',
            // borderWidth:1,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Inter-Black",
              color: "black",
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Inter-Black",
              color: "black",
            }}
          >
            {day}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              alignSelf: "center",
              fontFamily: "Inter-Black",
            }}
          >
            {punchIn}
          </Text>
          {/* <Chip style={{backgroundColor:'white',borderWidth:1,borderColor:'green'}} textStyle={{color:'#0088ff',fontFamily:'Inter-Black'}} mode="flat">
                    Punch In
                  </Chip> */}
          <Text
            style={{
              fontSize: 15.5,
              fontFamily: "Inter-Black",
              color: "green",
            }}
          >
            Punch in
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 15,
              alignSelf: "center",
              fontFamily: "Inter-Black",
            }}
          >
            {punchOut}
          </Text>
          {/* <Chip style={{backgroundColor:'white',borderWidth:1,borderColor:'green'}} textStyle={{color:'#0088ff',fontFamily:'Inter-Black'}} mode="flat">
                    Punch Out
                  </Chip> */}
          <Text
            style={{
              fontSize: 15.5,
              fontFamily: "Inter-Black",
              color: "orange",
              backgroundColor: "",
            }}
          >
            Punch out
          </Text>
        </View>
      </Surface>
    );
  });

  const List = memo(({ attendance }) => {
    return (
      <FlatList
        data={attendance}
        contentContainerStyle={{ paddingBottom: 0 }}
        renderItem={({ item }) => <RenderList data={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={fetchdata}
        refreshing={loading}
      />
    );
  }, (prevProps, nextProps) => {
    return prevProps.attendance === nextProps.attendance;
  });

  return <List attendance={attendance} />;
}

export default AttendanceList2;

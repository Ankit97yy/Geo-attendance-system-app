import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Surface } from "react-native-paper";
import { Avatar } from "react-native-paper";

export default function Approvedrequest() {
  const ResolvedRequest = [
    {
      emp_name: "Ankit Das",
      reason: "Sick Leave",
      duration: "from jan 15 to jan 20",
      status: "Approved",
      id: "1",
    },
    {
      emp_name: "Arijeet Kumar Das",
      reason: "Annual Leave",
      duration: "from jan 15 to jan 20",
      status: "Rejected",
      id: "2",
    },
    {
      emp_name: "Rasidul Haque",
      reason: "Sick Leave",
      duration: "from jan 15 to jan 20",
      status: "Approved",
      id: "3",
    },
  ];

  const [data, setdata] = useState(ResolvedRequest);

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => {
        return (
          <Surface
            style={{
              height: 80,
              marginBottom: 5,
              backgroundColor: "white",
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            elevation={1}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Avatar.Text
                  size={37}
                  label={item.emp_name.split(" ").map((i) => i.charAt(0))}
                  style={{ marginHorizontal: 10, alignSelf: "center" }}
                />
                <View style={{}}>
                  <Text style={{ fontFamily: "Inter-Black", fontSize: 17 }}>
                    {item.emp_name}
                  </Text>
                  <Text style={{ fontFamily: "Inter-Black", color: "grey" }}>
                    {item.reason}
                  </Text>
                  <Text style={{ fontFamily: "Inter-Black", color: "grey" }}>
                    {item.duration}
                  </Text>
                </View>
              </View>
              <View style={{marginHorizontal:10}}>
                <Text style={item.status==='Approved'?{color:'green',shadowColor:'green',fontSize:17,textShadowColor:'green',textShadowRadius:0.5}:{color:'red',fontSize:17,textShadowColor:'red',textShadowRadius:0.2}}>{item.status}</Text>
              </View>
            </View>
          </Surface>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Chip, FAB, Surface } from "react-native-paper";
import { Avatar } from "react-native-paper";
import axios from "axios";
import { DateTime } from "luxon";
import WelcomeScreen from "./WelcomeScreen";
import AppHeader from "./AppHeader";
import { StyleSheet } from "react-native";

export default function Approvedrequest({navigation}) {
  const [leaves, setleaves] = useState([])
  console.log("🚀 ~ file: Approvedrequest.jsx:13 ~ Approvedrequest ~ leaves:", leaves)
  const [loading, setloading] = useState(false)
  const [refresh, setrefresh] = useState(true)
  useEffect(()=>{
    setloading(true)
    axios.get(`/leave/getAllLeavesOfAnEmployee`)
    .then(res=>{
      setleaves(res.data)
      setloading(false)
    })
  },[refresh])


  return (
    <>
    <AppHeader/>
    <FAB
        icon="plus"
        size="medium"
        style={styles.fab}
        color="white"
        onPress={() => navigation.navigate("ApplyLeave")}
      />
    <FlatList
      data={leaves}
      contentContainerStyle={{marginTop:5}}
      renderItem={({ item }) => {
        return (
          <Surface
            style={{
              height: 90,
              marginBottom: 5,
              backgroundColor: "white",
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            elevation={1}
          >
              
            {/* <Chip style={{jus}}></Chip> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                flex: 1
              }}
            >
            <View style={{position:'absolute',bottom:69}}>
                {/* <Chip mode="outlined">lala</Chip> */}
                <Text style={{color:'grey',fontSize:13}}>{DateTime.fromISO(item.created_time).toFormat('dd-MM-yyyy')}</Text>
              </View>
                <View style={{}}>
                  <Text style={{ fontFamily: "Inter-Black",fontSize:17,textTransform:'capitalize' }}>
                    {item.leave_type} leave
                  </Text>
                  {/* <Text style={{ fontFamily: "Inter-Black",fontSize:15,flexWrap:"wrap" }}>jnfkwjebf weifwoei</Text> */}
                  <Text style={{ fontFamily: "Inter-Black", color: "grey" }}>
                    {DateTime.fromISO(item.start).toLocaleString({day:'numeric',month:'short',year:'2-digit'})} - {DateTime.fromISO(item.end).toLocaleString({day:'numeric',month:'short',year:'numeric'})}
                  </Text>
                </View>
              <View style={{marginHorizontal:10}}>
                <Text style={item.status==='approved'?{color:'green',backgroundColor:'#b4f3d0',borderRadius:5,padding:5,shadowColor:'green',fontSize:16,textShadowColor:'green',textShadowRadius:0.5,textTransform:'capitalize'}:{color:'red',fontSize:16,backgroundColor:'#ffeced',padding:5,borderRadius:5,textShadowColor:'red',textShadowRadius:0.2,textTransform:'capitalize'}}>{item.status}</Text>
              </View>
            </View>
          </Surface>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={()=>setrefresh(!refresh)}
      refreshing={loading}
      />
      </>
  );
}

const styles = StyleSheet.create({

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "#0088ff",
  },
})

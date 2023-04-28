import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, FAB, Modal, Portal } from "react-native-paper";
import Lottie from "lottie-react-native";
import { useContext } from "react";
import { userDataContext } from "../contexts/SignedInContext";
import axios from "axios";

export default function MarkAtttendance() {
  const {userData}=useContext(userDataContext);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [render, setrender] = useState(true);
  const [visible, setvisible] = useState(false);
  const showModal = () => setvisible(true);
  const hideModal = () => setvisible(false);
  useEffect(() => {
    (async () => {
      try {
        console.log("opened");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
        console.log("opened 1");

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
        console.log("opened 2");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [render]);

  if (!currentLocation) {
    return (
      <>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold",fontFamily:'Inter-Black',fontSize:20 }}>Reloading.....</Text>
        </View>
        <FAB
          style={{ position: "absolute",bottom:40,right:16 }}
          icon="reload"
          onPress={() => setrender(!render)}
        />
      </>
    );
  }
  console.log(currentLocation);

  const handlePunchIn=()=>{
    axios.post('http://192.168.29.133:3001/attendance/addAttendance',{},{
      headers:{
        Authorization: `Bearer ${userData.accessToken}`
      }
    })
    .then(res=>{
      if(res.data.attendance) showModal()
    })
    .catch(err=>console.log(err))
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }}
          title={"you are here"}
        />
      </MapView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <Button
          disabled={false}
          style={{ width: "45%" }}
          mode="contained"
          onPress={handlePunchIn}
        >
          Punch in
        </Button>
        <Button disabled={true} style={{ width: "45%" }} mode="contained">
          Punch Out
        </Button>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          dismissable={true}
          contentContainerStyle={{}}
        >
          <Lottie
            resizeMode="contained"
            style={{ width: 300, left: 20, bottom: 10 }}
            source={require("../assets/676-done.json")}
            autoPlay
            loop={false}
            speed={1.5}
            onAnimationFinish={hideModal}
          />
          {/* <Text style={{textAlign:'center',fontSize:20}}>Attendance marked succesfully</Text> */}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "65%",
  },
});

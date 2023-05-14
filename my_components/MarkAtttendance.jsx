import { initialState } from "../hooks/LocationHook";
import { locationReducer } from "../hooks/LocationHook";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import React, { useContext, useEffect, useReducer } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import { Button, FAB, Modal, Portal } from "react-native-paper";
import Lottie from "lottie-react-native";
import haversine from "./test";
import moment from "moment/moment";
import axios from "axios";
import { userDataContext } from "../contexts/SignedInContext";

export default function MarkAtttendance() {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  const { userData } = useContext(userDataContext);

  const handlePunchIn = () => {
    axios
      .post("attendance/addAttendance")
      .then((res) => {
        if (res.data.attendance) dispatch({ type: "handlePunchIn" });
      })
      .catch((err) => console.log(err));
  };

  const handlePunchOut = () => {
    axios
      .post("attendance/addAttendance")
      .then((res) => {
        if (res.data.attendance) dispatch({ type: "handlePunchOut" });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // dispatch({
    //   type: "checkTime",
    //   payload: { startTime: "09:30:00", endTime: "18:30:00" },
    // });

    axios
      .get("branch/getBranch")
      .then((res) => {
        dispatch({
          type: "checkTime",
          payload: { startTime: res.data.start_time, endTime:res.data.end_time },
        });
      })
      .catch((err) => console.log(err));
    axios
      .get("/attendance/getTodayAttendanceOfAnEmployee")
      .then((res) => {
        if (res.data.length > 0) {
          if (res.data[0].in_time !== null) {
            dispatch({ type: "donePunchedIn", payload: true });
          }
          if (res.data[0].out_time !== null) {
            dispatch({ type: "donePunchedOut", payload: true });
          }
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("/leave/getOngoingLeaveOfAnEmployee")
      .then((res) => {
        if (res.data.onLeave) dispatch({ type: "onLeave", payload: true });
        else dispatch({ type: "onLeave", payload: false });
      })
      .catch((err) => console.log(err, "kakak"));
  }, []);

  useEffect(() => {
    let timeId;
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        timeId = setInterval(async () => {
          try {
            console.log("fired");
            console.log(timeId, "id");
            let locations = await Location.getCurrentPositionAsync();
            console.log(
              "🚀 ~ file: MarkAtttendance.jsx:83 ~ location:",
              locations
            );
            dispatch({
              type: "location",
              payload: locations,
            });
          } catch (error) {
            console.log("cleaned");
            console.log(timeId, "clear time");
            clearInterval(timeId);
            console.log(error, "ppppp");
          }
        }, 2000);
      } catch (error) {
        console.log(error, "ppppp");
      }
    })();

    return () => {
      console.log("cleaned");
      console.log(timeId, "clear time");
      clearInterval(timeId);
    };
  }, [state.render]);

  useEffect(() => {
    if (state.canMarkAttendance()) {
      const distance = haversine(
        state.currentLocation.coords.latitude,
        state.currentLocation.coords.longitude,
        userData.latitude, //! set data from context
        userData.longitude
      );
      console.log(
        "🚀 ~ file: MarkAtttendance.jsx:86 ~ useEffect ~ distance:",
        distance
      );
      if (distance <= 100) {
        if (!state.donePunchedIn)
          dispatch({ type: "enablePunchIn", payload: true });
        else if (!state.donePunchedOut)
          dispatch({ type: "enablePunchOut", payload: true });
      } else {
        dispatch({ type: "enablePunchIn", payload: false });
        dispatch({ type: "enablePunchOut", payload: false });
      }
    }
  }, [
    state.currentLocation,
    state.onLeave,
    state.donePunchedIn,
    state.donePunchedOut,
  ]); //! dependency array is an object!!!

  let message;
  if (state.onLeave)
    message = <Text style={{ fontSize: 18 }}>You are on leave</Text>;
  else if (state.punchIn || state.punchOut)
    message = <Text style={{ fontSize: 18 }}>You are in office reach</Text>;
  else if (state.donePunchedIn && state.donePunchedOut)
    message = (
      <Text style={{ fontSize: 18 }}>You have marked your attendance</Text>
    );
  else if (!state.inTime)
    message = (
      <Text style={{ fontSize: 18 }}>
        You can mark attendance only in office hours
      </Text>
    );
  else
    message = <Text style={{ fontSize: 18 }}>You are not in office reach</Text>;

  // if (!currentLocation) {
  //   return (
  //     <>
  //       <View
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         <Text style={{ fontWeight: "bold",fontSize:20 }}>Reloading.....</Text>
  //       </View>
  //       <FAB
  //         style={{ position: "absolute",bottom:40,right:16 }}
  //         icon="reload"
  //         onPress={() => setrender(!render)}
  //       />
  //     </>
  //   );
  // }
  const CustomMarker = ({ avatar }) => {
    return (
      <View style={styles.markerContainer}>
        <Image
          source={require("../assets/pin.png")}
          style={styles.markerImage}
        />
        <Image
          source={require("../assets/kk.jpg")}
          style={styles.avatarImage}
        />
      </View>
    );
  };
  return (
    <>
      <FAB
        style={{ position: "absolute", bottom: 40, right: 16 }}
        icon="reload"
        onPress={() => dispatch({ type: "render" })}
      />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          // initialRegion={{
          //   latitude: 26.1635302,
          //   longitude: 91.7648572,
          //   latitudeDelta: 0.0122,
          //   longitudeDelta: 0.0121,
          // }}
          region={{
            latitude: userData.latitude,
            longitude: userData.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
        >
          {state.showMarker ? (
            <Marker
              coordinate={{
                latitude: state.currentLocation.coords.latitude,
                longitude: state.currentLocation.coords.longitude,
              }}
              // image={require("../assets/kk.jpg")}
            >
              <CustomMarker />
            </Marker>
          ) : null}
          <Circle
            center={{
              latitude: userData.latitude,
              longitude: userData.longitude,
            }}
            strokeWidth={2}
            strokeColor="green"
            radius={100}
          />
        </MapView>
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 30 }}
        >
          <Text style={{ color: "grey", fontSize: 17 }}>
            {moment().format("DD MMMM YYYY | h:mm a")}
          </Text>
          {/* {state.onLeave ? (
            <Text style={{ fontSize: 18 }}>You are on Leave</Text>
          ) : (
            <Text style={{ fontSize: 18 }}>
              {state.punchIn
                ? "You are inside of the region"
                : "You are outside of the region"}
            </Text>
          )} */}
          <Text>{message}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 70,
          }}
        >
          <View>
            <Button
              disabled={!state.punchIn}
              style={{ padding: 5 }}
              mode="contained"
              onPress={handlePunchIn}
              buttonColor="#083efd"
            >
              punch in
            </Button>
            <Text></Text>
          </View>
          <View>
            <Button
              buttonColor="#083efd"
              style={{ padding: 5 }}
              mode="contained"
              disabled={!state.punchOut}
              onPress={handlePunchOut}
            >
              punch out
            </Button>
            <Text></Text>
          </View>
        </View>

        <Portal>
          <Modal
            visible={state.visible}
            onDismiss={() => dispatch({ type: "hideModal" })}
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
              onAnimationFinish={() => dispatch({ type: "hideModal" })}
            />
            {/* <Text style={{textAlign:'center',fontSize:20}}>Attendance marked succesfully</Text> */}
          </Modal>
        </Portal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "50%",
  },
  markerContainer: {
    alignItems: "center",
  },
  markerImage: {
    width: 70,
    height: 78,
  },
  avatarImage: {
    width: 33,
    height: 34,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    bottom: 30,
  },
});

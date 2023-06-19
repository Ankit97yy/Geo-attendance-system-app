import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Divider,
  Modal,
  Portal,
  RadioButton,
  Surface,
} from "react-native-paper";
import { Button, TextInput } from "react-native-paper";
import { DateTime } from "luxon";
import Lottie from "lottie-react-native";
import { socket } from "./SocketConn";
export default function ApplyLeave({navigation}) {
  const [desc, setdesc] = useState("");
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [checked, setChecked] = useState("");
  console.log("🚀 ~ file: ApplyLeave.jsx:31 ~ ApplyLeave ~ checked:", checked);
  const [remainingLeaves, setremainingLeaves] = useState(null);
  const [onLeave, setonLeave] = useState(false);
  const [notAvailable, setnotAvailable] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let result1 = (await axios.get("leave/getOngoingLeaveOfAnEmployee"))
          .data.onLeave;
        console.log("🚀 ~ file: ApplyLeave.jsx:32 ~ result1:", result1);

        if (result1) {
          setonLeave(true);
          return;
        }

        let result2 = (await axios.get("leave/getRemainingLeaves")).data;
        setremainingLeaves(result2);
        if (
          result2?.annual === 0 &&
          result2?.sick === 0 &&
          result2?.casual === 0
        )
          setnotAvailable(true);
      } catch (error) {
        console.log("🚀 ~ file: ApplyLeave.jsx:39 ~ error:", error);
      }
    })();
  }, []);

  const handleConfirmStart = (date) => {
    console.log("🚀 ~ file: ApplyLeave.jsx:32 ~ handleConfirm ~ date:", date);
    let dt = DateTime.fromJSDate(date);
    setstartDate(dt.toFormat("yyyy-MM-dd"));
    console.log("A date has been picked: ", dt.toFormat("yyyy-MM-dd"));
    setStartDatePickerVisibility(false);
  };
  const handleConfirmEnd = (date) => {
    console.log("🚀 ~ file: ApplyLeave.jsx:32 ~ handleConfirm ~ date:", date);
    let dt = DateTime.fromJSDate(date);
    setendDate(dt.toFormat("yyyy-MM-dd"));
    console.log("A date has been picked: ", dt.toFormat("yyyy-MM-dd"));
    setEndDatePickerVisibility(false);
  };

  const handleApply = () => {
    if (
      startDate === null ||
      endDate === null ||
      desc === "" ||
      checked === ""
    ) {
      alert("Fill all the fields");
      return;
    }
    axios
      .post("leave/requestLeave", {
        reason: desc,
        start: startDate,
        end: endDate,
        type: checked,
      })
      .then((res) => {
        // axios
        //   .get("leave/getRemainingLeaves")
        //   .then((res) => setremainingLeaves(res.data));
        setshowAlert(true);
        socket.emit("APPLY_LEAVE", "test");
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  const RadioButtons = () => {
    return (
      <Surface
        style={{
          backgroundColor: "white",
          marginVertical: 5,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "#0088ff" }}>Annual</Text>
            <Text style={{ fontSize: 17 }}>{remainingLeaves?.annual}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "tomato" }}>Sick</Text>
            <Text style={{ fontSize: 17 }}>{remainingLeaves?.sick}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "orange" }}>Casual</Text>
            <Text style={{ fontSize: 17 }}>{remainingLeaves?.casual}</Text>
          </View>
        </View>
        <RadioButton.Item
          // position="leading"
          value="annual"
          label="Annual Leave"
          status={checked === "annual" ? "checked" : "unchecked"}
          disabled={remainingLeaves?.annual === 0 ? true : false}
          onPress={() => setChecked("annual")}
        />
        {/* <Text style={{ fontSize: 17 }}>Annual Leave</Text> */}
        <Divider />
        <RadioButton.Item
          // position="leading"
          label="Sick leave"
          value="sick"
          status={checked === "sick" ? "checked" : "unchecked"}
          disabled={remainingLeaves?.sick === 0 ? true : false}
          onPress={() => setChecked("sick")}
        />
        <Divider />

        {/* <Text style={{ fontSize: 17 }}>Sick Leave</Text> */}
        <RadioButton.Item
          // position="leading"
          label="Casual Leave"
          value="casual"
          status={checked === "casual" ? "checked" : "unchecked"}
          onPress={() => setChecked("casual")}
          disabled={remainingLeaves?.casual === 0 ? true : false}
        />
        {/* <Text style={{ fontSize: 17 }}>Casual Leave</Text> */}
      </Surface>
    );
  };
  let button_text = "";
  if (onLeave) button_text = "You are already on leave";
  else if (notAvailable) button_text = "No available leaves";
  else button_text = "Apply";

  const handleKeyboard=()=>{
    console.log("clicked")
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback onPress={handleKeyboard}>
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <View>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmStart}
            onCancel={() => setStartDatePickerVisibility(false)}
            minimumDate={new Date()}
            maximumDate={
              endDate
                ? DateTime.fromFormat(endDate, "yyyy-MM-dd").toJSDate()
                : null
            }
          />
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmEnd}
            onCancel={() => setEndDatePickerVisibility(false)}
            minimumDate={
              startDate
                ? DateTime.fromFormat(startDate, "yyyy-MM-dd").toJSDate()
                : new Date()
            }
          />
          <RadioButtons />
          <TextInput
            style={{ height: 150, marginBottom: 10, backgroundColor: "white" }}
            placeholder="Enter your reason..."
            onChangeText={(text) => setdesc(text)}
            mode="outlined"
            multiline={true}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignItems: "center" }}>
              <Button
                style={{ marginVertical: 0 }}
                icon="calendar"
                mode="contained"
                onPress={() => setStartDatePickerVisibility(true)}
              >
                Start
              </Button>
              <Text style={{ fontSize: 16 }}>{startDate}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Button
                style={{ marginBottom: 0 }}
                icon={"calendar"}
                mode="contained"
                onPress={() => setEndDatePickerVisibility(true)}
              >
                End
              </Button>
              <Text style={{ fontSize: 16 }}>{endDate}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            disabled={onLeave || notAvailable}
            onPress={handleApply}
            mode="contained"
          >
            {button_text}
          </Button>
        </View>
        <Portal>
          <Modal
            visible={showAlert}
            onDismiss={() => setshowAlert(false)}
            dismissable={true}
            contentContainerStyle={{}}
          >
            <Lottie
              resizeMode="contain"
              style={{ width: 300, marginHorizontal: 15 }}
              source={require("../assets/33886-check-okey-done")}
              autoPlay
              loop={false}
              speed={2}
              onAnimationFinish={() => setshowAlert(false)}
            />
            {/* <Text style={{textAlign:'center',fontSize:20}}>Attendance marked succesfully</Text> */}
          </Modal>
        </Portal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30,
  },
});

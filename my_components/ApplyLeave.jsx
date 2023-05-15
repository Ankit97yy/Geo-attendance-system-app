import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userDataContext } from "../contexts/SignedInContext";
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
export default function ApplyLeave() {
  const [desc, setdesc] = useState("");
  const [startDate, setstartDate] = useState("");
  const [start, setstart] = useState(false);
  const [end, setend] = useState(false);
  const [endDate, setendDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [checked, setChecked] = useState("annual");
  const [remainingLeaves, setremainingLeaves] = useState(null);
  const [onLeave, setonLeave] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  useEffect(() => {
    axios.get("leave/getOngoingLeaveOfAnEmployee").then((res) => {
      if (res.data.onLeave) setonLeave(true);
      else setonLeave(false);
    });

    axios
      .get("leave/getRemainingLeaves")
      .then((res) => setremainingLeaves(res.data))
      .catch((err) => console.log(err));
  }, []);
  const showDatePicker = (val) => {
    val === "start" ? setstart(true) : setend(true);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    start ? setstart(false) : setend(false);
    end ? setend(false) : setstart(false);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("🚀 ~ file: ApplyLeave.jsx:32 ~ handleConfirm ~ date:", date);
    let dt = DateTime.fromJSDate(date);
    start
      ? setstartDate(dt.toFormat("yyyy-MM-dd"))
      : setendDate(dt.toFormat("yyyy-MM-dd"));
    console.log("A date has been picked: ", dt.toFormat("yyyy-MM-dd"));
    hideDatePicker();
    // setdate(date.toDateString().slice(4))
  };

  const handleApply = () => {
    // if(startDate==="" || endDate==="" || desc===""){
    //   alert("fill")
    // }
    // axios
    //   .post("leave/requestLeave", {
    //     reason: desc,
    //     start: startDate,
    //     end: endDate,
    //     type: checked,
    //   })
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
    setshowAlert(true);
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
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

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.container}>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={
            start
              ? new Date()
              : DateTime.fromFormat(startDate, "yyyy-MM-dd").toJSDate()
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <Button
              style={{ marginVertical: 0 }}
              icon="calendar"
              mode="contained"
              onPress={() => showDatePicker("start")}
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
              onPress={() => showDatePicker("end")}
            >
              End
            </Button>
            <Text style={{ fontSize: 16 }}>{endDate}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button disabled={onLeave} onPress={handleApply} mode="contained">
          {onLeave ? "You are already on leave" : "Apply"}
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30,
    marginHorizontal: 5,
  },
});

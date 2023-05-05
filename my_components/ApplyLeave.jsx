import { View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useContext, useState } from "react";
import axios from "axios";
import { userDataContext } from "../contexts/SignedInContext";
import { Divider, RadioButton, Surface } from "react-native-paper";
import { Button, TextInput } from "react-native-paper";
import { DateTime } from "luxon";

export default function ApplyLeave() {
  const [desc, setdesc] = useState("");
  const [startDate, setstartDate] = useState("");
  console.log("🚀 ~ file: ApplyLeave.jsx:12 ~ ApplyLeave ~ startDate:", startDate)
  const [start, setstart] = useState(false);
  const [end, setend] = useState(false);
  const [endDate, setendDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { userData } = useContext(userDataContext);
  const [checked, setChecked] = useState("annual");
  //   const [date, setdate] = useState(new Date().toDateString().slice(4))
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
    console.log("🚀 ~ file: ApplyLeave.jsx:32 ~ handleConfirm ~ date:", date)
    let dt=DateTime.fromJSDate(date)
    start ? setstartDate(dt.toFormat('yyyy-MM-dd')) : setendDate(dt.toFormat('yyyy-MM-dd'));
    console.log("A date has been picked: ", dt.toFormat('yyyy-MM-dd'));
    hideDatePicker();
    // setdate(date.toDateString().slice(4))
  };

  const handleApply = () => {
    axios
      .post("leave/requestLeave", {
        reason: desc,
        start: startDate,
        end: endDate,
        type: checked,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const RadioButtons = () => {
    return (
      <Surface style={{backgroundColor:'white',marginVertical:5,borderRadius:10}}>
          <RadioButton.Item
          // position="leading"
            value="annual"
            label="Annual Leave"
            status={checked === "annual" ? "checked" : "unchecked"}
            onPress={() => setChecked("annual")}
          />
          {/* <Text style={{ fontSize: 17 }}>Annual Leave</Text> */}
<Divider/>
          <RadioButton.Item
          // position="leading"
          label="Sick leave"
            value="sick"
            status={checked === "sick" ? "checked" : "unchecked"}
            onPress={() => setChecked("sick")}
          />
<Divider/>

          {/* <Text style={{ fontSize: 17 }}>Sick Leave</Text> */}
          <RadioButton.Item
          // position="leading"
          label="Casual Leave"
            value="casual"
            status={checked === "casual" ? "checked" : "unchecked"}
            onPress={() => setChecked("casual")}
          />
          {/* <Text style={{ fontSize: 17 }}>Casual Leave</Text> */}
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
          maximumDate={new Date(2050,12,30)} //! fix this
        />
        <RadioButtons />
        <TextInput
          style={{ height: 150,marginBottom:10,backgroundColor:'white' }}
          placeholder="Enter your reason..."
          onChangeText={(text) => setdesc(text)}
          mode="outlined"
          multiline={true}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{alignItems:'center'}}>
            <Button
              style={{ marginVertical: 0 }}
              icon="calendar"
              mode="contained"
              onPress={() => showDatePicker("start")}
            >
              Start
            </Button>
            <Text style={{fontSize:16}}>{startDate}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Button
              style={{ marginBottom: 0 }}
              icon={"calendar"}
              mode="contained"
              onPress={() => showDatePicker("end")}
            >
              End
            </Button>
            <Text style={{fontSize:16}}>{endDate}</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20 }}>
        <Button onPress={handleApply} mode="contained">
          Apply
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30,
    marginHorizontal: 5,
  },
});

import { View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useContext, useState } from "react";
import axios from "axios";
import { userDataContext } from "../contexts/SignedInContext";
import { RadioButton } from "react-native-paper";
import { Button, TextInput } from "react-native-paper";

export default function ApplyLeave() {
  const [desc, setdesc] = useState("");
  const [startDate, setstartDate] = useState("");
  const [start, setstart] = useState(false);
  const [end, setend] = useState(false);
  const [endDate, setendDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { userData } = useContext(userDataContext);
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
    //toDateString();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    start ? setstartDate(formattedDate) : setendDate(formattedDate);
    console.log("A date has been picked: ", formattedDate);
    hideDatePicker();
    // setdate(date.toDateString().slice(4))
  };

  const handleApply = () => {
    axios
      .post("leave/requestLeave", {
        reason: desc,
        start: startDate,
        end: endDate,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const RadioButtons = () => {
    const [checked, setChecked] = useState("first");

    return (
      <View style={{}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
          />
          <Text style={{fontSize:17}}>Annual Leave</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
          />
          <Text style={{fontSize:17}}>Sick Leave</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="third"
            status={checked === "third" ? "checked" : "unchecked"}
            onPress={() => setChecked("third")}
          />
          <Text style={{fontSize:17}}>Casual Leave</Text>
        </View>
      </View>
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
      />
      <Text style={{fontSize:18,fontWeight:"bold"}}>Choose Leave type</Text>
      <RadioButtons />
      <Button style={{width:'50%',marginBottom:5}} icon="calendar" mode="outlined" onPress={() => showDatePicker("start")}>Start date</Button>
      <Button style={{width:'50%'}} icon={"calendar"} mode="outlined" onPress={() => showDatePicker("end")}>End Date</Button>
      <TextInput
        style={{ height: 150 }}
        onChangeText={(text) => setdesc(text)}
        mode="outlined"
        multiline={true}
        />
        </View>
      <View style={{justifyContent:'flex-end',flex:1,marginBottom:10}}>
      <Button onPress={handleApply} buttonColor="navy" mode="contained">
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

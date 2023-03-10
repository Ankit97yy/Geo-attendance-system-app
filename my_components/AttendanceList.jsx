import { View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Hello from "./Hello";

export default function AttendanceList() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setdate] = useState(new Date().toDateString().slice(4))

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //toDateString();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log("A date has been picked: ", formattedDate);
    hideDatePicker();
    setdate(date.toDateString().slice(4))
  };
  return (
    <View style={{ marginVertical: 10 }}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 12,
        }}
      >
        <Text style={{ fontSize: 17, fontFamily: "Inter-Medium" }}>
          Attendance
        </Text>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="calendar"
            size={25}
            onPress={showDatePicker}
          />
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Inter-Medium",
              color: "grey",
              marginLeft: 5,
            }}
          >
            {date}
          </Text>
        </View>
      </View>
      {/* <Hello /> */}
    </View>
  );
}

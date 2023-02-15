import React, { useState } from 'react'
import { Button, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { object, string, number } from 'yup'
import { Formik } from 'formik'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Axios from 'axios'

export default function RegisterOrganization({ route,navigation }) {
  const [start_time, setstarttime] = useState('')
  const [end_time, setendtime] = useState('')
  const [start, setstart] = useState(false)
  const [end, setend] = useState(false)
  const [timevisible, settimevisible] = useState(false)

  function showDatePicker(clock) {
    if(clock==='start') setstart(true)
    if(clock==='end')setend(true)
    settimevisible(true);
  }
  function hideDatePicker() {
    settimevisible(false)
  }
  function handleConfirm(date) {
    if(start){
    setstarttime(date.toLocaleTimeString())
    setstart(false)
    }
    if(end){
    setendtime(date.toLocaleTimeString())
    setend(false)
    }
    hideDatePicker();
  }
  const validationScheme = object({
    organizationName: string().required().label("Name"),
    latitude: number().required(),
    longitude: number().required(),
  })

  function register(val) {
    Axios.post('http://192.168.148.4:3001/auth/register', {
      ...route.params, ...val,start_time,end_time,is_admin:"yes"
    })
      .then((res) => {
        if(res.data.userExist) console.log("user already exist");
        else if (res.data.success){
          console.log("yaaaaayy");
          navigation.navigate("HomeScreen")
        }
        else console.log("email or password is incorrect")

      })
  }
  return (
    <Formik
      initialValues={{ organizationName: "", latitude: "", longitude: "", start_time: "", end_time: "", location_name: "" }}
      onSubmit={(values) => register(values)}
      validationSchema={validationScheme}
    >
      {({ handleChange, handleSubmit, errors }) => (
        <View>
          <Text>Enter the Name of your organization</Text>
          <TextInput onChangeText={handleChange("organizationName")} />
          <Text>Enter latitude</Text>
          <Text>{errors.latitude}</Text>
          <TextInput onChangeText={handleChange("latitude")}></TextInput>
          <Text>Enter longitude</Text>
          <Text>{errors.longitude}</Text>
          <TextInput onChangeText={handleChange("longitude")}></TextInput>
          <Text>enter location name</Text>
          <TextInput onChangeText={handleChange("location_name")}></TextInput>
          <TouchableOpacity onPress={()=>showDatePicker('start')}>
            <Text>{start_time || 'Select Start Time'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>showDatePicker('end')}>
            <Text>{end_time || 'Select End Time'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={timevisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Button title='Submit' onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

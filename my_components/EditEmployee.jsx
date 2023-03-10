import { View, Text } from 'react-native'
import React from 'react'
import { Divider, List, TextInput } from 'react-native-paper'

export default function EditEmployee() {
  return (
    <View>
   <TextInput
      mode="outlined"
      label="employee Name"
    />
       <TextInput
      mode="outlined"
      label="change password"
    />
    
    </View>
  )
}
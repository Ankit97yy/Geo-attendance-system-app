import { View, Text } from 'react-native'
import React from 'react'
import { Divider, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function Settings() {
    const navigation=useNavigation()
  return (
    <View>
      <List.Item title="Change email" onPress={()=>navigation.navigate("ChangeEmail")} left={props => <List.Icon {...props} icon="email" />}/>
      {/* <Divider/> */}
      <List.Item onPress={()=>navigation.navigate("ChangePassword")} title="Change password" left={props => <List.Icon {...props} icon="account-lock" />}/>
    </View>
  )
}
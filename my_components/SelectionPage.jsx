import React from 'react'
import { View,StyleSheet, Button } from 'react-native'

export default function SelectionPage({}) {
  return (
    <View >
        <Button title='Register Organization' />
        <Button title='Create Account'/>
    </View>
  )
}
const styles = StyleSheet.create({
    main:{
      alignItems:'center',
      paddingTop:300
    },
    TextInput:{
      padding:10,
      margin:10,
      backgroundColor:"cyan",
      borderRadius:15,
      fontSize:20,
    }
  });
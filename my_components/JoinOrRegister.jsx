import React from 'react'
import { Button } from 'react-native'

export default function JoinOrRegister({navigation,route}) {
  return (
    <>
    <Button title='Join an Organization'/>
    <Button title='Register Organization' onPress={()=>{navigation.navigate("OrganizationName",route.params)}}/>
    </>
  )
}

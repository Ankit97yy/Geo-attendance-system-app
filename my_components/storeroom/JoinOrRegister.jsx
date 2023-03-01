import React from 'react'
import { Button } from 'react-native'

export default function JoinOrRegister({navigation,route}) {
  console.log(route.params);
  return (
    <>
    <Button title='Join an Organization' onPress={()=>{navigation.navigate("OrganizationName",route.params)}}/>
    <Button title='Register Organization' onPress={()=>{navigation.navigate("RegisterOrganization",route.params)}}/>
    </>
  )
}

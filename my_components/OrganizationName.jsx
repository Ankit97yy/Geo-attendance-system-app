import React from 'react'
import { Button } from 'react-native'

export default function OrganizationName({navigation}) {
  return (
    <>
    <View>
        <Text>
            Write the name of your Organization
        </Text>
        <Button title='Submit' onPress={()=>navigation.navigate("ChooseLocation")}/>
    </View>
    </>
  )
}

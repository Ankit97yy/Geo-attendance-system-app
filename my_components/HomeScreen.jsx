import React from 'react'
import { Button,Text, View } from 'react-native'
import { useContext } from 'react'
import { signedInContext } from '../contexts/SignedInContext'

export default function HomeScreen() {
  const {setisSignedIn}=useContext(signedInContext)
  return (
    <>
    <View style={{paddingTop:250,justifyContent:'center',alignItems:'center'}}>

    <Text style={{fontSize:20}}>welcome to the app</Text>
    <Button title='Log out' onPress={()=>setisSignedIn(false)}></Button>
    </View>
    </>
  )
}

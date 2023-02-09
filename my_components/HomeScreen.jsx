import React from 'react'
import { Button,Text, View } from 'react-native'
import { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signedInContext } from '../contexts/SignedInContext'

export default function HomeScreen() {
  const isSignedInStore = async (value) => {
    try {
      await AsyncStorage.setItem('isSignedIn', value)
    } catch (e) {
      console.log(e);
    }
  }
  const {setisSignedIn,first}=useContext(signedInContext)
  return (
    <>
    <View style={{paddingTop:250,justifyContent:'center',alignItems:'center'}}>

    <Text style={{fontSize:20}}>welcome to the app</Text>
    <Button title='Log out' onPress={()=>{setisSignedIn(false),isSignedInStore('false')}}></Button>
      <Button title='print' onPress={()=>console.log(first)}/>
    </View>
    </>
  )
}

import React from 'react'
import { Button, Text, View } from 'react-native'
import { useContext } from 'react'
import { userDataContext } from '../../contexts/SignedInContext'
import * as SecureStore from 'expo-secure-store';
import { SECRET_KEY } from "@env"

export default function HomeScreen() {
  async function deleteToken() {
    let result = await SecureStore.deleteItemAsync(SECRET_KEY);
  }
  const { setisSignedIn, first } = useContext(userDataContext)
  return (
    <>
      <View style={{ paddingTop: 250, justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ fontSize: 20 }}>welcome to the app</Text>
        <Button title='Log out' onPress={() => { setisSignedIn(false), deleteToken()}}></Button>
      </View>
    </>
  )
}

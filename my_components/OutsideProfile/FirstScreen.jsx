import React from 'react'
import { Text,StyleSheet,View, Button } from 'react-native'

export default function FirstScreen({navigation}) {


  return (
    <>
    <View style={styles.main}>
    <Button title='Log In' onPress={()=>navigation.navigate('LogIn')}/>
    <Button title='Create Account' onPress={()=>navigation.navigate('CreateAccount')}/>
    </View>
    </>

  );
};

const styles = StyleSheet.create({
  main:{
    alignItems:'center',
    paddingTop:300
  },
  TextInput:{
    margin:10,
    backgroundColor:"cyan",
    borderRadius:15,
    fontSize:20
  }
})




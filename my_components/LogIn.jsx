import React from 'react'
import { useFormik,Formik } from 'formik';
import { object, ref, string } from 'yup'
import { Button, TextInput, View,StyleSheet,Text } from 'react-native';

export default function LogIn() {

  const validationScheme=object({
    email:string().email().required().label("email"),
    password:string().required().min(4).label("Password"),
  })
  return (
    <Formik 
    initialValues={{name:"",email:"",password:"",confirm_password:""}}
    onSubmit={values=>console.log(values)}
    validationSchema={validationScheme}
    >
      {({handleChange,handleSubmit,errors})=>(

    <View style={styles.main}>
        <TextInput style={styles.TextInput} onChangeText={handleChange(email)} placeholder='enter email'></TextInput>
        <TextInput style={styles.TextInput} onChangeText={handleChange} placeholder='enter password'></TextInput>
        <Button title='Log in' onPress={handleSubmit}></Button>
        <Text > Forgot password?</Text>
    </View>
      )}
      </Formik>
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

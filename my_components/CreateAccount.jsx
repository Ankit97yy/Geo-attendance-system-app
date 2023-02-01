import { Formik } from 'formik'
import React from 'react'
import { View,StyleSheet, Text, TextInput, Button } from 'react-native'
import { object, ref, string } from 'yup'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Axios from 'axios'
// import axios from 'axios'
// import axios from 'axios'

export default function RegisterForm() {
  const validationScheme=object({
    name:string().required().label("Name"),
    email:string().email().required().label("email"),
    password:string().required().min(4).label("Password"),
    confirm_password:string().required("Confirm password field is required").oneOf([ref("password"),null],"Password does not match")
  })


const register=(val)=>{
  console.log("lol");
//   fetch('http://192.168.29.133:3001/register', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name: val.name,
//     email: val.email,
//     password:val.password
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

   Axios.post('http://192.168.29.133:3001/register',{
      name:val.name,
      email:val.email,
      password:val.password
    }
    )
    .then((res)=>{
        console.log(res);
      })
    .catch((err)=>{
          console.log(err);
        })
  //   console.log("hi");
    }
  return (
    <Formik 
    initialValues={{name:"",email:"",password:"",confirm_password:""}}
    onSubmit={(values)=>register(values)}
    validationSchema={validationScheme}
    >
      {({handleChange,handleSubmit,errors})=>(
        <View style={styles.main}>

        <Text style={{fontSize:20,fontWeight:'bold'}}>Register</Text>

        <TextInput onChangeText={handleChange("name")} style={styles.TextInput} placeholder='Enter your name'/>

        <Text style={styles.alert}>{errors.name}</Text>

        <View style={{justifyContent:'flex-start'}}>
        <MaterialCommunityIcons name='email' size={20} color="dodgerblue"/>
        <TextInput keyboardType='email-address' onChangeText={handleChange("email")} style={styles.TextInput} placeholder='enter your email'/>
        </View>

        <Text style={styles.alert}>{errors.email}</Text>

        <TextInput onChangeText={handleChange("password")} style={styles.TextInput} placeholder='Enter password'/>

        <Text style={styles.alert}>{errors.password}</Text>

        <TextInput onChangeText={handleChange("confirm_password")} style={styles.TextInput} placeholder='Confirm password'/>

        <Text style={styles.alert}>{errors.confirm_password}</Text>

        <Button title='Submit' onPress={handleSubmit}/>
    </View>
      )}
</Formik>
  )
};
const styles = StyleSheet.create({
    main:{
      alignItems:'center',
    },
    TextInput:{
      padding:10,
      margin:10,
      backgroundColor:"cyan",
      borderRadius:15,
      fontSize:20,
    },
    alert:{
      color:"red"
    }

})

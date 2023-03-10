import React from 'react'
import { Formik } from 'formik';
import { object, ref, string } from 'yup'
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';
import Axios from 'axios';
import { useContext } from 'react';
import { signedInContext } from '../../contexts/SignedInContext';
import * as SecureStore from 'expo-secure-store';
import {SECRET_KEY} from '@env'
import loginSuccModal from './LoginSuccModal';

export default function LogIn() {

  const { setisSignedIn } = useContext(signedInContext)

  async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const validationScheme = object({
    email: string().email().required().label("email"),
    password: string().required().min(4).label("Password"),
  })

  const login = (val) => {
    Axios.post('http://192.168.148.4:3001/auth/login', {
      email: val.email,
      password: val.password
    }
    )
     .then((res) => {
        if (res.data.canLogIn) {
          console.log(res.data.accessToken);
          return <loginSuccModal/>
          // saveToken(SECRET_KEY, res.data.accessToken)
          // setisSignedIn(true);
        }
        else console.log("email or password is incorrect")
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={values => login(values)}
      validationSchema={validationScheme}
    >
      {({ handleChange, handleSubmit, errors }) => (

        <View style={styles.main}>
          <TextInput style={styles.TextInput} onChangeText={handleChange("email")} placeholder='enter email'></TextInput>
          <Text style={styles.alert}>{errors.email}</Text>
          <TextInput style={styles.TextInput} onChangeText={handleChange("password")} placeholder='enter password'></TextInput>
          <Text style={styles.alert}>{errors.password}</Text>
          <Button title='Log in' onPress={handleSubmit}></Button>
          <Text > Forgot password?</Text>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingTop: 150
  },
  TextInput: {
    padding: 10,
    margin: 10,
    backgroundColor: "cyan",
    borderRadius: 15,
    fontSize: 20,
  },
  alert: {
    color: "red"
  }
});

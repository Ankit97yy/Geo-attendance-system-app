import React from 'react'
import { Button, TextInput, View,Text } from 'react-native'
import { object,string } from 'yup'
import { Formik } from 'formik'

export default function OrganizationName({navigation,route}) {
  const validationScheme = object({
    OrganizationName: string().required().label("Name"),
  })

  const submit=(val)=>{
    console.log("click");
    navigation.navigate("ChooseLocation",{...route.params,OrganizationName:val.OrganizationName})
  }
  return (
    <Formik
    initialValues={{ OrganizationName: "" }}
    onSubmit={(values) => submit(values)}
    validationSchema={validationScheme}
  >
    {({ handleChange, handleSubmit, errors }) => (
      <View>
      <Text>Enter the Name of your organization</Text>
      <TextInput onChangeText={handleChange("OrganizationName")}/>
      <Button title='Submit' onPress={handleSubmit}/>
      </View>
      )}
    </Formik>
  )
}

import Axios from 'axios'
import { Formik } from 'formik'
import React, { useContext } from 'react'
import { object,string } from 'yup'
import { Button, Text, TextInput } from 'react-native'
import { number } from 'yup/lib/locale'
import { signedInContext, userDataContext } from '../../contexts/SignedInContext'

export default function OrganizationLatLong({route }) {
    const validationScheme = object({
        latitude: string().required(),
        longitude: string().required(),
    })
    const { userData } = useContext(userDataContext)

    function register(val) {
        Axios.post('http://192.168.148.4:3001/register', {
            ...route.params, latitude: val.latitude, longitude: val.longitude
        })
            .then((res) => {
                if (!res.data.userExist)
                    setisSignedIn(true);
                else console.log("email or password is incorrect")

            })
    }
    return (
        <Formik
            initialValues={{ latitude: "", longitude: "" }}
            onSubmit={values => register(values)}
            validationSchema={validationScheme}
        >
            {({ handleChange, handleSubmit, errors }) => (
                <>
                    <Text>Enter latitude</Text>
                    <TextInput onChangeText={handleChange("latitude")}></TextInput>
                    <Text>Enter longitude</Text>
                    <TextInput onChangeText={handleChange("longitude")}></TextInput>
                    <Button title='Register' onPress={handleSubmit}></Button>
                </>
            )}
        </Formik>

    )
}

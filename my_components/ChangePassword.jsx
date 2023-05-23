import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import axios from "axios";

export default function ChangePassword() {
  const [visible, setvisible] = useState(true);
  const validationScheme = object({
    old_password: string().required().label("Old password"),
    new_password: string().min(6).required().label("New password"),
    confirm_password: string()
      .oneOf([ref("new_password"), null], "Password must match")
      .required()
      .label("Confirm Password"),
  });

  const handleSubmit=(val)=>{
    axios.patch("employee/changePassword/",val)
    .then(()=>alert("changed password successfully"))
    .catch((err)=>{
        console.log(err)
        alert("something went wrong")
    })
  }

  const togglePasswordVisibility = () => setvisible(!visible);
  return (
    <View style={{marginHorizontal:5}}>
      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          confirm_password: "",
        }}
        onSubmit={(val) => handleSubmit(val)}
        validationSchema={validationScheme}
      >
        {({ handleChange, handleSubmit, errors, touched, handleBlur }) => (
          <View>
            <TextInput
              label="Old password"
              textContentType="password"
              error={Boolean(errors.old_password) && touched.old_password}
              onChangeText={handleChange("old_password")}
              onBlur={handleBlur("old_password")}
              // spellCheck={false}
              mode="outlined"
            />

            {touched.old_password ? <Text>{errors.old_password}</Text> : null}
            <TextInput
              label="New Password"
              textContentType="password"

              onChangeText={handleChange("new_password")}
              onBlur={handleBlur("new_password")}
              mode="outlined"
              secureTextEntry={visible}
              right={
                <TextInput.Icon
                  onPress={togglePasswordVisibility}
                  icon={visible ? "eye" : "eye-off"}
                />
              }
              error={Boolean(errors.new_password) && touched.new_password}
            />
            {touched.new_password ? <Text>{errors.new_password}</Text> : null}
            <TextInput
              label="Confirm Password"
              textContentType="password"

              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              mode="outlined"
              secureTextEntry={visible}
              right={
                <TextInput.Icon
                  onPress={togglePasswordVisibility}
                  icon={visible ? "eye" : "eye-off"}
                />
              }
              error={
                Boolean(errors.confirm_password) && touched.confirm_password
              }
            />
            {touched.confirm_password ? (
              <Text>{errors.confirm_password}</Text>
            ) : null}

            <Button style={{marginTop:10}} mode="contained" onPress={handleSubmit}>
              Change Password
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

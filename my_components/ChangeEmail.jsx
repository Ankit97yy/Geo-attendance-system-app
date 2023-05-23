import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import axios from "axios";

export default function ChangeEmail() {
  const validationScheme = object({
    old_email: string().email().required().label("Old email"),
    new_email: string().email().required().label("New email"),
    confirm_email: string()
      .oneOf([ref("new_email"), null], "email must match")
      .required()
      .label("Confirm email"),
  });

  const handleKeyboard = () => {
    console.log("clicked");
    Keyboard.dismiss();
  };

  const handleSubmit=(val)=>{
    axios.patch("employee/changeEmail/",val)
    .then(()=>alert("changed password successfully"))
    .catch((err)=>{
        console.log(err)
        alert("something went wrong")
    })
  }

  return (
    <View style={{ marginHorizontal: 5,flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleKeyboard}>
        <Formik
          initialValues={{
            old_email: "",
            new_email: "",
            confirm_email: "",
          }}
          onSubmit={(val) => console.log(val)}
          validationSchema={validationScheme}
        >
          {({ handleChange, handleSubmit, errors, touched, handleBlur }) => (
            <View>
              <TextInput
                label="Old Email"
                textContentType="emailAddress"
                error={Boolean(errors.old_email) && touched.old_email}
                onChangeText={handleChange("old_email")}
                onBlur={handleBlur("old_email")}
                // spellCheck={false}
                mode="outlined"
              />

              {touched.old_email ? <Text>{errors.old_email}</Text> : null}
              <TextInput
                label="New Email"
                textContentType="emailAddress"
                onChangeText={handleChange("new_email")}
                onBlur={handleBlur("new_email")}
                mode="outlined"
                error={Boolean(errors.new_email) && touched.new_email}
              />
              {touched.new_email ? <Text>{errors.new_email}</Text> : null}
              <TextInput
                label="Confirm Email"
                textContentType="emailAddress"
                onChangeText={handleChange("confirm_email")}
                onBlur={handleBlur("confirm_email")}
                mode="outlined"
                error={Boolean(errors.confirm_email) && touched.confirm_email}
              />
              {touched.confirm_email ? (
                <Text>{errors.confirm_email}</Text>
              ) : null}

              <Button
                style={{ marginTop: 10 }}
                mode="contained"
                onPress={handleSubmit}
              >
                Change Email
              </Button>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
}

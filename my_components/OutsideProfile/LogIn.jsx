import React, { useState } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { TextInput } from "react-native-paper";
import { userDataContext } from "../../contexts/SignedInContext";
import * as SecureStore from "expo-secure-store";
import Lottie from "lottie-react-native";
import { SECRET_KEY } from "@env";
import axios from "axios";

export default function LogIn() {
  const { setuserData } = useContext(userDataContext);
  const [showpassword, setshowpassword] = useState(false);

  async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const validationScheme = object({
    email: string().email().required().label("email"),
    password: string().required().min(4).label("Password"),
  });

  const login = (val) => {
    console.log("llllll");
    axios
      .post("auth/login", {
        email: val.email,
        password: val.password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          console.log(res.data.accessToken);
          // return <loginSuccModal/>
          setuserData((prev) => {
            return {
              ...prev,
              accessToken: res.data.accessToken,
              isSignedIn: true,
              fullName: res.data.name,
              latitude: res.data.latitude,
              longitude: res.data.longitude,
              branch_location_name: res.data.branchName,
              profile_picture:res.data.profile_picture
            };
          });

          saveToken(SECRET_KEY, res.data.accessToken);
        } else if (!res.data?.user) console.log("user not found");
        else if (!res.data.password) console.log("incorrect password");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => login(values)}
      validationSchema={validationScheme}
    >
      {({ handleChange, handleSubmit, errors }) => (
        <View style={styles.main}>
          <Lottie
            resizeMode="contained"
            style={{ width: 150, bottom: 0, alignSelf: "center" }}
            source={require("../../assets/5733-location-map.json")}
            autoPlay
            speed={1.5}
          />
          <Text
            style={{
              fontFamily: "Inter-Black",
              fontSize: 26,
              alignSelf: "center",
            }}
          >
            Geo-attendance
          </Text>
          <TextInput
            keyboardType="email-address"
            mode="outlined"
            label="Enter email"
            onChangeText={handleChange("email")}
          />
          <Text style={styles.alert}>{errors.email}</Text>
          <TextInput
            secureTextEntry={!showpassword}
            mode="outlined"
            label="Enter password"
            onChangeText={handleChange("password")}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setshowpassword(!showpassword)}
              />
            }
          />
          <Text style={styles.alert}>{errors.password}</Text>
          <Button mode="contained" onPress={handleSubmit}>
            Log in
          </Button>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    // paddingTop: 150,
  },
  TextInput: {
    padding: 10,
    margin: 10,
    backgroundColor: "cyan",
    borderRadius: 15,
    fontSize: 20,
  },
  alert: {
    color: "tomato",
    alignSelf: "center",
  },
});

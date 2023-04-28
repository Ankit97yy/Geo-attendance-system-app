import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { object, ref, string } from "yup";
import {
  TextInput,
  Menu,
  Button,
  Divider,
  Dialog,
  Portal,
  RadioButton,
} from "react-native-paper";
import { Formik } from "formik";
import axios from "axios";

export default function AddEmployee() {
  const validationScheme = object({
    full_name: string().required().label("Full name"),
    email: string().email().required().label("email"),
  });

  useEffect(() => {
    axios
      .get("http://192.168.192.4:3001/branch/getBranches")
      .then((res) => setbranches(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [visible, setVisible] = useState(false);
  const [branch, setbranch] = useState();
  const [branches, setbranches] = useState([]);
  const [is_admin, setis_admin] = useState("No");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  function addEmployee(values) {
    axios.post("http://192.168.29.168:3001/employee/addEmployee", {
      ...values,
      branch,
      is_admin,
    });
  }
  return (
    <View style={{ marginHorizontal: 10 }}>
      <Formik
        initialValues={{
          full_name: "",
          email: "",
        }}
        onsubmit={(values) => addEmployee(values)}
        validationSchema={validationScheme}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <TextInput mode="outlined" label="name" />
            <TextInput mode="outlined" label="email" />
          </>
        )}
      </Formik>
      <View style={{ flexDirection: "row" }}>
        <Button
          mode="text"
          style={{ alignSelf: "flex-start" }}
          onPress={showDialog}
        >
          Select Branch
        </Button>
        <Portal>
          <Dialog
            style={{ height: 400 }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Choose a branch</Dialog.Title>
            {/* <Dialog.ScrollArea> */}
            <FlatList
              renderItem={({ item }) => {
                return (
                  <RadioButton.Item
                    status={branch === item.id ? "checked" : "unchecked"}
                    label={item.location_name}
                    value={item.location_name}
                    onPress={() => setbranch(item.id)}
                  />
                );
              }}
              data={branches}
            />
            {/* </Dialog.ScrollArea> */}
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {branch !== "" ? (
          <Text style={{ alignSelf: "center" }}>{branch}</Text>
        ) : null}
      </View>
      <Text>Make Admin?</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Yes</Text>
        <RadioButton
          value="Yes"
          status={is_admin === "Yes" ? "checked" : "unchecked"}
          onPress={() => setis_admin("Yes")}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>No</Text>
        <RadioButton
          value="No"
          status={is_admin === "No" ? "checked" : "unchecked"}
          onPress={() => setadmin("No")}
        />
      </View>
      <Button mode="contained">Add employee</Button>
    </View>
  );
}

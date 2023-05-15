import React, { useContext, useState } from "react";
import { Appbar, Avatar, Divider, Menu, Provider } from "react-native-paper";
import { Text, View } from "react-native";
import { SECRET_KEY } from "@env";
import * as SecureStore from "expo-secure-store";
import { userDataContext } from "../contexts/SignedInContext";

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { setuserData} = useContext(userDataContext);

  const handLogout = async () => {
    await SecureStore.deleteItemAsync(SECRET_KEY);
    setuserData((prev) => {
      return {
        fullName: "",
        branch_location_name: "",
          latitude:0,
          longitude:0,
        isSignedIn: false,
        accessToken:null
      };
    });
  };
  return (
    <Appbar.Header
      // elevated={false}
      statusBarHeight={0}
      style={{
        marginHorizontal: 0,
        marginTop: 30,
        height: 90,
        backgroundColor: "#0088ff",
      }}
    >
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Avatar.Image
          source={require("../assets/kk.jpg")}
          style={{ marginRight: 5 }}
          size={45}
        />
        <View style={{flexDirection: "row",justifyContent: "space-between",flex: 1}}>
          <View>
            <Appbar.Content
              title="Welcome, Ankit"
              titleStyle={{
                fontSize: 18,
                fontFamily: "Inter-Black",
                color: "white",
              }}
            />
            <Appbar.Content
              title="DownTown Branch"
              titleStyle={{
                fontSize: 13,
                color: "white",
                fontFamily: "Inter-Black",
              }}
            />
          </View>
          <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Appbar.Action icon="menu" color="white" onPress={()=>setVisible(prev=> !prev)} />
                }
              >
                <View style={{}}>
                <Menu.Item onPress={() => {}} title="Settings" />
                <Menu.Item onPress={handLogout} title="Logout" />
                </View>
              </Menu>
        </View>
      </View>
          
    </Appbar.Header>
  );
};

export default AppHeader;

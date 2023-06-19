import React, { useContext, useState } from "react";
import { Appbar, Avatar, Divider, Menu, Provider } from "react-native-paper";
import { Text, View } from "react-native";
import { SECRET_KEY } from "@env";
import * as SecureStore from "expo-secure-store";
import { userDataContext } from "../contexts/SignedInContext";
import { useNavigation } from '@react-navigation/native';
import profilepicture from '../assets/kk.jpg'

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { userData,setuserData} = useContext(userDataContext);
  const navigation = useNavigation();
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
  let profile_picture=`../assests/${userData.profile_picture}`
  return (
    <Appbar.Header
      // elevated={false}
      statusBarHeight={0}
      style={{
        marginHorizontal: 0,
        marginTop: 30,
        height: 80,
        backgroundColor: "#0088ff",
      }}
    >
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Avatar.Image
          source={{uri:`http://192.168.29.133:3001/${userData.profile_picture}`}}
          // source={require(`../assets/kk.jpg`)}
          
          style={{ marginRight: 5 }}
          size={45}
        />
        <View style={{flexDirection: "row",justifyContent: "space-between",flex: 1}}>
          <View>
            <Appbar.Content
              title={userData?.fullName}
              titleStyle={{
                fontSize: 18,
                fontFamily: "Inter-Black",
                color: "white",
              }}
            />
            <Appbar.Content
              title={`${userData?.branch_location_name} Branch`}
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
                contentStyle={{backgroundColor:"white"}}
                anchor={
                  <Appbar.Action icon="dots-vertical" color="white" onPress={openMenu} />
                }
              >
                <View style={{}}>
                <Menu.Item onPress={() => {
                  closeMenu();
                  navigation.navigate("Settings")}} title="Settings" />
                  <Divider/>
                <Menu.Item onPress={handLogout} title="Logout" />
                </View>
              </Menu>
        </View>
      </View>
          
    </Appbar.Header>
  );
};

export default AppHeader;

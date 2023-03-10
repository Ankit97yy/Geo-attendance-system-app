import * as React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { Text, View } from "react-native";

const AppHeader = () => (
  <Appbar.Header
    elevated={false}
    statusBarHeight={0}
    style={{
      borderRadius: 1,
      borderWidth: 0.1,
      marginHorizontal: 0,
      marginTop:30,
      height: 55,
    }}
  >
    {/* <Appbar.BackAction onPress={() => {}} /> */}
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Avatar.Text
        size={37}
        style={{ marginHorizontal: 10, alignSelf: "center" }}
        label="AD"
      />
      <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
        <View>
          <Appbar.Content
            title="Welcome, Ankit"
            titleStyle={{ fontSize: 18, fontFamily: "Inter-Black" }}
          />
          <Appbar.Content
            title="Branch manager"
            titleStyle={{
              fontSize: 13,
              color: "grey",
              fontFamily: "Inter-Black",
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
          <Appbar.Action icon="cog" onPress={() => {}} />
        </View>
      </View>
    </View>
  </Appbar.Header>
);

export default AppHeader;

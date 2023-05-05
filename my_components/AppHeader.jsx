import * as React from "react";
import { Appbar, Avatar } from "react-native-paper";
import { Text, View } from "react-native";

const AppHeader = () => (
  <Appbar.Header
    // elevated={false}
    statusBarHeight={0}
    style={{
      marginHorizontal: 0,
      marginTop:30,
      height: 90,
      backgroundColor:'#0088ff',
    }}
  >
    {/* <Appbar.BackAction onPress={() => {}} /> */}
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Avatar.Image source={require('../assets/kk.jpg')} style={{marginRight:5}} size={50}/>
      <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
        <View>
          <Appbar.Content
            title="Welcome, Ankit"
            titleStyle={{ fontSize: 18, fontFamily: "Inter-Black",color:'white' }}
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
        <View style={{ flexDirection: "row" }}>
          {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
          <Appbar.Action icon="menu" color="white" onPress={() => {}} />
        </View>
      </View>
    </View>
  </Appbar.Header>
);

export default AppHeader;

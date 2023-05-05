import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row",justifyContent:'space-between',marginHorizontal:10,marginTop:20 }}>
       <Avatar.Image source={require('../assets/kk.jpg')} size={50}/>
        <View>
          <Text style={{ color: "white", fontSize: 19 }}>Welcome Ankit</Text>
          <Text style={{ color: "white", fontSize: 14 }}>Down Town Branch</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    backgroundColor: "blue",
    height:100,
    justifyContent:'center',
  },
});

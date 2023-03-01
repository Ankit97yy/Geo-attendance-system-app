import { React, useEffect, useState } from "react";
import Axios from "axios";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function OrganizationName({navigation,route}) {
  const [orgnames, setorgnames] = useState([]);
  useEffect(() => {
    Axios.get("http://192.168.29.133:3001/org/getOrgNames")
      .then((res) => setorgnames(res.data))
      .catch((err) => console.log(err));
  }, []);
console.log(route.params);
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <FlatList
        data={orgnames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("BranchNames",{
                ...route.params,organization_id:item.id
            })}>
              <Text style={{ fontSize: 20 }}>{item.organization_name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

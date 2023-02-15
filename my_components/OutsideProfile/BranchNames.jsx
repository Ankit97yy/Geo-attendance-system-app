import { React, useEffect, useState } from "react";
import Axios from "axios";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function BranchNames({navigation,route}) {
  const [branchnames, setBranchnames] = useState([]);
  const [branchId, setbranchId] = useState("")
  useEffect(() => {
    Axios.get(`http://192.168.29.133:3001/org/getBranchNames/${route.params.organization_id}`)
      .then((res) => setBranchnames(res.data))
      .catch((err) => console.log(err));
  }, []);

  function register(val) {
    console.log(route.params,val);
    Axios.post('http://192.168.29.133:3001/auth/register', {
      ...route.params, branch_location_id:val,is_admin:"no"
    })
      .then((res) => {
        if(res.data.userExist) console.log("user already exist");
        else if (res.data.success){
          console.log("yaaaaayy");
          navigation.navigate("HomeScreen")
        }
        else console.log("email or password is incorrect")

      }).catch((err)=>console.log(err))
  }

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <FlatList
        data={branchnames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => register(item.id)}>
              <Text style={{ fontSize: 20 }}>{item.location_name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
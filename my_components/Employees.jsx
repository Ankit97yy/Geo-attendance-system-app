import { View, FlatList, TouchableOpacity } from "react-native";
import { List, Divider, Avatar, TextInput } from "react-native-paper";
import React, { useState } from "react";
import AppHeader from "./AppHeader";
import Fab from "./Fab";

export default function Employees({ navigation }) {
  const [search, setsearch] = useState("");
  const data = [
    { id: "1", name: "Aarav Patel", location: "Ahmedabad" },
    { id: "2", name: "Avni Shah", location: "Surat" },
    { id: "3", name: "Ishaan Gupta", location: "Jaipur" },
    { id: "4", name: "Kavya Singh", location: "Delhi" },
    { id: "5", name: "Aadi Singh", location: "Mumbai" },
    { id: "6", name: "Riya Reddy", location: "Hyderabad" },
    { id: "7", name: "Arjun Nair", location: "Chennai" },
    { id: "8", name: "Advait Rao", location: "Bangalore" },
    { id: "9", name: "Meera Kapoor", location: "Pune" },
    { id: "10", name: "Aryan Joshi", location: "Ahmedabad" },
    { id: "11", name: "Jhanvi Desai", location: "Mumbai" },
    { id: "12", name: "Kabir Bhatia", location: "Delhi" },
    { id: "13", name: "Anika Gupta", location: "Hyderabad" },
    { id: "14", name: "Rudra Singh", location: "Chennai" },
    { id: "15", name: "Saanvi Kumar", location: "Bangalore" },
    { id: "16", name: "Kia Patel", location: "Surat" },
    { id: "17", name: "Arnav Sharma", location: "Pune" },
    { id: "18", name: "Ishita Singh", location: "Jaipur" },
    { id: "19", name: "Nivaan Reddy", location: "Hyderabad" },
    { id: "20", name: "Aadya Nair", location: "Chennai" },
  ];

  function Item({ title, location }) {
    return (
      <List.Item
        titleStyle={{ fontFamily: "Inter-Black", fontSize: 17 }}
        title={title}
        description={location}
        descriptionStyle={{ color: "grey" }}
        left={() => (
          <Avatar.Text
            label={title.split(" ").map((item) => item.charAt(0))}
            size={40}
          />
        )}
      />
    );
  }

  function renderItem({ item }) {
    {if(search==="") return(
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EmpWorkingHours");
          console.log(item.id);
        }}
      >
        <Item title={item.name} location={item.location} />
        <Divider />
      </TouchableOpacity>
    )
    else if(item.name.toLowerCase().includes(search.toLowerCase())) return (
       <TouchableOpacity
        onPress={() => {
          navigation.navigate("EmpWorkingHours");
          console.log(item.id);
        }}
      >
        <Item title={item.name} location={item.location} />
        <Divider />
      </TouchableOpacity>
    )
    }
  }
  return (
    <>
      <AppHeader />
      <TextInput
        style={{ marginHorizontal: 5 }}
        mode="outlined"
        placeholder="Search"
        value={search}
        onChangeText={(text) => setsearch(text)}
        left={<TextInput.Icon icon="magnify" />}
      />
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Fab screen="AddEmployee" navigation={navigation}/>
    </>
  );
}

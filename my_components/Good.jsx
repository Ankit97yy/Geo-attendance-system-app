import { View, FlatList } from "react-native";
import { List, Divider } from "react-native-paper";
import React from "react";

export default function Good() {
  const data = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
    { id: "5", title: "Item 5" },
    { id: "6", title: "Item 6" },
    { id: "7", title: "Item 7" },
    { id: "8", title: "Item 8" },
    { id: "9", title: "Item 9" },
    { id: "10", title: "Item 10" },
    { id: "23", title: "Item 6" },
    { id: "33", title: "Item 7" },
    { id: "83", title: "Item 8" },
    { id: "91", title: "Item 9" },
    { id: "11", title: "Item 10" },
    { id: "12", title: "Item 10" },
    { id: "13", title: "Item 10" },
    { id: "14", title: "Item 10" },
    { id: "15", title: "Item 10" },
    { id: "16", title: "Item 10" },
    { id: "17", title: "Item 10" },
    { id: "18", title: "Item 10" },
    { id: "19", title: "Item 10" },
    { id: "20", title: "Item 10" },
  ];

  function Item({title}){

    return (
      <List.Item
      titleStyle={{fontFamily:'Inter-Black'}}
      title={title}
      left={() => <List.Icon icon="folder" />}
      />
      
     )
  }

  function renderItem({item}){
  return  <Item title={item.title} />
  
  }
  return( <
    View style={{ flex: 1 }}>
    <FlatList data={data} renderItem={renderItem} keyExtractor={item=>item.id}/>
    </View>


  )
}

import { View, Text, FlatList} from "react-native";
import React,{useState} from "react";
import { Avatar, IconButton, Surface, TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SegmentedButtons } from 'react-native-paper';
import Approvedrequest from "./Approvedrequest";

export default function LeaveRequest() {
  const request = [
    {
      emp_name: "Ankit Das",
      reason: "Sick Leave",
      duration:"from jan 15 to jan 20",
      id:"1"
    },
    {
      emp_name: "Arijeet Kumar Das",
      reason: "Annual Leave",
      duration:"from jan 15 to jan 20",
      id:"2"
    },
    {
      emp_name: "Rasidul Haque",
      reason: "Sick Leave",
      duration:"from jan 15 to jan 20",
      id:"3"
    },
  ];

  const [data, setdata] = useState(request)
  const [value, setValue] = useState('pending')
  const deleterequest=(index)=>{
    const newData=[...request];
    newData.splice(index);
    setdata(newData)
  }

  const PendingRequest=()=>{
    if(data.length===0) return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

    <Text style={{fontFamily:'Inter-Black',fontSize:22}}>No pending requests.....</Text>
        </View>
    )
    return(
<FlatList
      data={data}
      renderItem={({ item,index }) => {
        return (

          <Surface
            style={{
                height: 80,
              marginBottom: 5,
              backgroundColor: "white",
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            elevation={1}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center",justifyContent:'space-between', flex: 1 }}
            >
              <View style={{flexDirection:'row'}}>
                <Avatar.Text size={37} label={item.emp_name.split(" ").map((i)=>i.charAt(0))} style={{marginHorizontal:10,alignSelf:'center'}} />
                <View style={{}}>

                <Text style={{fontFamily:'Inter-Black',fontSize:17}}>{item.emp_name}</Text>
            <Text style={{fontFamily:'Inter-Black',color:'grey'}}>{item.reason}</Text>
            <Text style={{fontFamily:'Inter-Black',color:'grey'}}>{item.duration}</Text>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <IconButton icon="check" size={20} mode='contained' iconColor="white" containerColor="green"/>
                <IconButton style={{marginLeft:10}} icon="close" size={20} mode='contained' iconColor="white" containerColor="tomato" onPress={()=>deleterequest(index)}/>
              </View>
            </View>
          </Surface>
        );
    }}
    keyExtractor={(item) => item.id.toString()}
    />
    )
  }
  return (<>
          <SegmentedButtons
          style={{marginVertical:5,marginHorizontal:10}}
          
        value={value}
        onValueChange={setValue}
        buttons={[
            {
            value: 'pending',
            label: 'Pending',
            style:{backgroundColor:'white'},
            showSelectedCheck:true
        },
          {
              value: 'Fulfilled',
            label: 'Fulfilled',
            style:{backgroundColor:'white'},
            showSelectedCheck:true
        }
        ]}
      />
      {value==='pending'?<PendingRequest/> : <Approvedrequest/>}
    
    </>
  );
}
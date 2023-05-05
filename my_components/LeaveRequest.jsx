import { View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from "react-native";
import React,{useState} from "react";
import { Avatar, IconButton, Surface, Portal,Dialog,Button, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SegmentedButtons } from 'react-native-paper';
import Approvedrequest from "./Approvedrequest";
import AppHeader from "./AppHeader";
import Fab from "./Fab";
import ApplyLeave from "./ApplyLeave";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import WelcomeScreen from "./WelcomeScreen";

export default function LeaveRequest({navigation}) {
  setStatusBarStyle('dark')

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
   const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('New Leave')
    const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
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
  <AppHeader/>
  {/* <WelcomeScreen/> */}
          <SegmentedButtons
          style={{marginVertical:5,marginHorizontal:10}}
          
        value={value}
        onValueChange={setValue}
        buttons={[
            {
            value: 'New Leave',
            label: 'New leave',
            style:{backgroundColor:'white'},
            showSelectedCheck:true
        },
          {
              value: 'All Leaves',
            label: 'All Leaves',
            style:{backgroundColor:'white'},
            showSelectedCheck:true
        }
        ]}
      />
      {value==='New Leave'? <ApplyLeave/> : <Approvedrequest/>}

    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
    backgroundColor:'navy',
    color:'white'
  },
})

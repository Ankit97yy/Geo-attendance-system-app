import { DateTime } from 'luxon';
import React, { memo } from 'react'
import { View,Text, FlatList } from 'react-native';
import { Chip, Surface } from 'react-native-paper';

function AttendanceList2({attendance}) {
        const RenderList=memo(({data})=>{
            const dateObject = DateTime.fromISO(data.date);
            const date = dateObject.toFormat("dd");
            const day = dateObject.toFormat("ccc");
            const punchIn = data.status === "present" ? DateTime.fromFormat(data.in_time, "HH:mm:ss").toFormat("t") : "";
            const punchOut = data.status === "present" ? DateTime.fromFormat(data.out_time, "HH:mm:ss").toFormat("t") : ""; //! handle null out_time
            // const bgColor= 
            return (
              <Surface
              // elevation={3}
                style={{
                  height: 100,
                  marginBottom: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  borderRadius: 10,
                  marginHorizontal: 5,
                  backgroundColor:"white"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ededed",
                    
                    justifyContent: "center",
                    width: 50,
                    alignItems: "center",
                    // borderColor:'black',
                    // borderWidth:1,
                    borderRadius:10
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold",fontFamily:'Inter-Black',color:'black' }}>{date}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold",fontFamily:'Inter-Black',color:'black' }}>{day}</Text>
                </View>
                <View style={{}}>
                  <Text style={{ fontSize: 15, alignSelf: "center",fontFamily:'Inter-Black' }}>{punchIn}</Text>
                  {/* <Chip style={{backgroundColor:'#00b57a'}} textStyle={{color:'white',fontFamily:'Inter-Black'}} mode="flat">
                    Punch In
                  </Chip> */}
                  <Text style={{ fontSize: 15.5,fontFamily:'Inter-Black',color:"green" }}>Punch in</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ fontSize: 15, alignSelf: "center",fontFamily:'Inter-Black' }}>{punchOut}</Text>
                  {/* <Chip style={{backgroundColor:'#00b57a'}} textStyle={{color:'white',fontFamily:'Inter-Black'}} mode="flat">
                    Punch Out
                  </Chip> */}
                  <Text style={{ fontSize: 15.5,fontFamily:'Inter-Black',color:"orange" }}>Punch out</Text>
                </View>
              </Surface>
            );
        })


    return (

        <FlatList
          data={attendance}
          contentContainerStyle={{paddingBottom:0}}
          renderItem={({ item }) => <RenderList data={item} />}
          keyExtractor={(item) => item.id}
          />
      
    )

}

export default memo(AttendanceList2)

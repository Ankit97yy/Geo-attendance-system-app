import { View, Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Button, Modal, Portal } from 'react-native-paper';
import Lottie from 'lottie-react-native';

export default function MarkAtttendance() {
  const [visible, setvisible] = useState(false)
  const showModal=()=>setvisible(true)
  const hideModal=()=>setvisible(false)
  return (
    <View style={styles.container}>
          <MapView style={styles.map}
    initialRegion={{
      latitude: 26.138219,
      longitude: 91.800023,
      latitudeDelta: 0.0062,
      longitudeDelta: 0.0061,
    }}
  >
<Marker coordinate={{
      latitude: 26.138219,
      longitude: 91.800023,
}}
        title={"you are here"}

/>

  </MapView>
  <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
  <Button disabled={false} style={{width:'45%'}} mode='contained' onPress={showModal}>Punch in</Button>
  <Button disabled={true} style={{width:'45%'}} mode='contained'>Punch Out</Button>
  </View>
  <Portal>
    <Modal visible={visible} onDismiss={hideModal} dismissable={true} contentContainerStyle={{}} >
      <Lottie resizeMode='contained' style={{width:300,left:20,bottom:10}} source={require('../assets/676-done.json')} autoPlay loop={false} speed={1.5} onAnimationFinish={hideModal}/>
      {/* <Text style={{textAlign:'center',fontSize:20}}>Attendance marked succesfully</Text> */}
    </Modal>
  </Portal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});
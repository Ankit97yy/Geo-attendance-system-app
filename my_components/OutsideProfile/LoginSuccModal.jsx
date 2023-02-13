import {React,useState} from 'react'
import { Button, Modal, Pressable, Text, View } from 'react-native'

export default function LoginSuccModal() {
    const [showmodal, setshowmodal] = useState(false)
    return (
        <View style={{flex:1,justifyContent:'center',paddingTop:20,alignItems:'center'}}>
            <Pressable onPress={()=>setshowmodal(false)}>

            <Modal
                
                animationType='slide'
                visible={showmodal}
                >
                <View>
                    <Text>
                        Login Successfull
                        <Pressable onPress={() => setshowmodal(false)}><Text>Hide Modal</Text></Pressable>
                    </Text>
                </View>
            </Modal>
                </Pressable>
            <Pressable onPress={() => setshowmodal(true)}>
                <Text >Show modal</Text>
            </Pressable>
        </View>
    )
}

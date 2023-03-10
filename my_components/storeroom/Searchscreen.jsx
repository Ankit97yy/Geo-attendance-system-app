import { React, useState, useEffect } from 'react'
import Axios from 'axios'
import { FlatList, View, Text, TouchableHighlight, TextInput } from 'react-native'



export default function SearchScreen() {
    const [datas, setdata] = useState({})
    const [search, setsearch] = useState("")
    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res) => setdata(res.data))
        //   console.log(datas[0]);

    }, [])
    function Item({ title, id }) {
        return (
            <TouchableHighlight onPress={() => console.log(id)} underlayColor='#ddd'>
    
                <Text style={{ fontSize: 20, marginBottom: 10,borderBottomWidth:1,borderBottomColor:'#000' }}>{title}</Text>
            </TouchableHighlight>
        )
    }
    return (
        <View style={{ marginTop: 30 }}>
            <TextInput placeholder='enter your query' value={search} onChangeText={(text) => setsearch(text)} />

            <FlatList
                data={datas}
                renderItem={({ item }) => {
                    if (search === "") return <Item title={item.title} id={item.id} />
                    else if (item.title.toLowerCase().includes(search.toLowerCase())){
                        return <Item title={item.title} id={item.id} />}
                    else return
                    
                }}
                keyExtractor={item => item.id}
                // ItemSeparatorComponent={() => <View style={{ backgroundColor: "#000", width: '100%', height: 1 }}></View>}
            />
        </View>
    )
}
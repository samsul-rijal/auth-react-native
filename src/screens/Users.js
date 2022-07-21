import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { FlatList } from 'react-native';

const Users = ({navigation}) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    
    const getData = async() => {

        try {
            const token = await AsyncStorage.getItem('token');
            if (token === null) {
                navigation.navigate("Login")
            }
    
            const config = {
                headers: {
                  'Content-type': 'application/json',
                  Authorization: 'Bearer ' + token 
                },
            };
    
            setIsLoading(true);
    
            const res = await axios.get("https://api.kontenbase.com/query/api/v1/d4092d20-bf08-4b97-a40f-d9cce26be7ea/Users", config)
            // console.log(res.data);
            setData(res.data)
            setIsLoading(false);
        
        } catch (error) {
            console.log(error);    
        }
    }
    
    useEffect(() => {
        getData()
    },[])

    const handleLogout = async() => {
        await AsyncStorage.removeItem('token');
        navigation.navigate("Login")
    }

    const _renderItem = ({ item }) => {
        return (
            <View style={{textAlign: 'center', padding: 5, marginVertical: 10, borderWidth: 2, borderRadius: 8, width: '100%'}}>
                <Text>{item.firstName}</Text>
                <Text>{item.email}</Text>
            </View>
        );
    };


    return (
        <View>

            <TouchableOpacity onPress={handleLogout} style={{margin: 8, color: 'red', fontSize: 18, fontWeight: 'bold', textAlign: 'end'}}>
                <Text>Logout</Text>
            </TouchableOpacity>
            <View style={{display: 'flex', alignItems: 'center'}}>
                <Text 
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginTop: 10
                    }}>
                    List Users
                </Text>

                <Text>
                    <FlatList
                        data={data}
                        renderItem={_renderItem}
                        keyExtractor={(item) => item}
                        refreshing={isLoading}
                        onRefresh={getData}
                    />
                </Text>
            </View>
        </View>
    )
}

export default Users
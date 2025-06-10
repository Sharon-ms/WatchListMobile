import axios from "axios"
import { useEffect, useState } from "react"

import { Button, Alert, View, Text } from "react-native"
export default function loginPage() {
    const [users, setUsers] = useState([])
    const getUsers = async () =>{
        const res = await axios.get("http://192.168.150.128:3000/users")
        setUsers(res.data)
    } 

    useEffect(()=>{
        getUsers()
    },[])
    return (
        <View>
           {
            users.map(u=>{
                return(
                <View key={u._id || u.userName}>
                    <Text>{u.name}</Text>
                </View>
                )
                
            })
           }
        </View>
    )
}

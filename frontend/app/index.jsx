import axios from "axios"
import { useState } from "react"
import {useRouter} from "expo-router"
import { SafeAreaView, Button, Alert, View, Text, TextInput, TouchableOpacity } from "react-native"
export default function loginPage() {
    const router = useRouter()
    const [user, setUser] = useState({"userName":"", "password":""})
    
    return (
        <SafeAreaView>
           <TextInput placeholder="user name"
           value={user.userName}
           onChangeText={(text)=>setUser(prev =>({...prev, userName: text}))}
           />

            <TextInput placeholder="password"
           value={user.password}
           onChangeText={(text)=>setUser(prev =>({...prev, password: text}))}
           />

           <Button title="Log in"
           onPress={async()=>{
                try{
                    const res = await axios.get(`http://192.168.150.128:3000/users/${user.userName}`);
                    const hasUser = res.data;
                     if(!hasUser){
                        Alert.alert("you don't have an account")
                    }
                    else{
                        hasUser.password === user.password ? Alert.alert(`${hasUser.name} log in`) :
                        Alert.alert("wrong password")
                    }
                }catch(err){
                    if(err.response && err.response.status === 404){
                        Alert.alert("you don't have an account")
                    }
                    else{
                        Alert.alert("connection error")
                    }
                }   
           }}/>

           <TouchableOpacity onPress={()=>{
                router.push("/registerPage")
           }}>
                <Text>Don't have an account? Sign Up</Text>
           </TouchableOpacity>
        </SafeAreaView>
    )
}

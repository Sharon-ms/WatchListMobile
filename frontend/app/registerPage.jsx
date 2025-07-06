import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, TextInput, Button, Alert } from "react-native";
import Constants from 'expo-constants';

export default function registerPage() {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const router = useRouter()
    const [newUser, setNewUser] = useState({ "name": "", "userName": "", "password": "" })
    //http:// 172.19.37.91:3000/users
    async function addUser(user) {
        try {
            const hasUser = await axios.get(`http://${IP_URL}:3000/users/${user.userName}`);
            Alert.alert("oops", "this username already in use");
            return;
        } catch (err) {
            if (err.response?.status === 404) {
                try {
                    const res = await axios.post(`http://${IP_URL}:3000/users`, user);
                    Alert.alert("Success", "user create");
                    router.push("/");
                } catch (createErr) {
                    Alert.alert("Error", "sign up failed")
                }
            }
            else {
                Alert.alert("Error", err.response?.data.message || "connection failed")
            }
        }
    }


    return (
        <SafeAreaView>
            <TextInput placeholder="name"
                value={newUser.name}
                onChangeText={(text) => setNewUser(prev => ({ ...prev, name: text }))}
            />

            <TextInput placeholder="user name"
                value={newUser.userName}
                onChangeText={(text) => setNewUser(prev => ({ ...prev, userName: text }))}
            />

            <TextInput placeholder="password"
                value={newUser.password}
                onChangeText={(text) => setNewUser(prev => ({ ...prev, password: text }))}
            />

            <Button title="sign up"
                onPress={async () => {
                    await addUser(newUser);
                }
                }
            />
        </SafeAreaView>
    )
}
import axios from "axios"
import { useUser } from "./context/UserContext"
import { useState } from "react"
import { useRouter } from "expo-router"
import { SafeAreaView, Button, Alert, View, Text, TextInput, TouchableOpacity } from "react-native"
import Constants from 'expo-constants';
 
export default function loginPage() {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { loginUser } = useUser()
    const router = useRouter()
    const [user, setUser] = useState({ "userName": "", "password": "" })

    return (
        <SafeAreaView>
            <TextInput placeholder="user name"
                value={user.userName}
                onChangeText={(text) => setUser(prev => ({ ...prev, userName: text }))}
            />

            <TextInput placeholder="password"
                value={user.password}
                onChangeText={(text) => setUser(prev => ({ ...prev, password: text }))}
            />

            <Button title="Log in"
                onPress={async () => {
                    try {
                        const res = await axios.get(`http://${IP_URL}:3000/users/${user.userName}`);
                        const hasUser = res.data;
                        if (!hasUser) {
                            Alert.alert("you don't have an account")
                        }
                        else {
                            if (hasUser.password === user.password) {
                                loginUser(hasUser);
                                router.push(`/profile/${hasUser.name}`)
                            }
                            else {
                                Alert.alert("wrong password")
                            }
                        }
                    } catch (err) {
                        if (err.response && err.response.status === 404) {
                            Alert.alert("you don't have an account")
                        }
                        else {
                            Alert.alert("Conection error")
                        }
                    }
                }} />


            <TouchableOpacity onPress={() => {
                router.push("/registerPage")
            }}>
                <Text>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

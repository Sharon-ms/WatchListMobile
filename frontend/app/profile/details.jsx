import { useState } from "react";
import { useUser } from "../context/UserContext";
import { SafeAreaView, Text, Button, Modal, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import Constants from 'expo-constants';

export default function details() {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { user, setIsAuthenticated } = useUser()
    const router = useRouter()
    const [showModal, setShaowModal] = useState(false)
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("")
    return (
        <SafeAreaView>
            <Text>My Account</Text>
            <Text>{user.name}</Text>
            <Text>{user.userName}</Text>
            <Text>{user.password}</Text>
            <Button title="change password"
                onPress={() => setShaowModal(true)}
            />
            <Modal visible={showModal}>
                <TextInput placeholder="current password"
                    value={currentPass}
                    onChangeText={(text) => setCurrentPass(text)} />

                <TextInput placeholder="new password"
                    value={newPass}
                    onChangeText={(text) => setNewPass(text)} />

                <TextInput placeholder="confirm password"
                    value={confirmPass}
                    onChangeText={(text) => setConfirmPass(text)} />

                <Button title="save"
                    onPress={async () => {
                        try {
                            if (currentPass !== user.password) {
                                return Alert.alert("wrong password")
                            }
                            if (newPass !== confirmPass) {
                                return Alert.alert("password don't match")
                            }
                            await axios.put(`http://${IP_URL}:3000/users/${user.userName}`, {newPassword: newPass})
                            Alert.alert("password changed")
                            setShaowModal(false)
                        }catch(err){
                            Alert.alert(err.response.message || "connection error")
                        }
            }} />
            </Modal>
            <Button title="delete account"
            onPress={async()=>{
                await axios.delete(`http://${IP_URL}:3000/users/${user.userName}`);
                await axios.delete(`http://${IP_URL}:3000/watched/${user.userName}`);
                Alert.alert("account deleted")
                setIsAuthenticated(false);
                router.push('/')
            }}/>
        </SafeAreaView>
    )
}
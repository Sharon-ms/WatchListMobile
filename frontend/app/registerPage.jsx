import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    SafeAreaView,
    TextInput,
    Alert,
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native";
import Constants from "expo-constants";

export default function RegisterPage() {
    const IP_URL = Constants.expoConfig.extra.IP_URL;
    const router = useRouter();
    const [newUser, setNewUser] = useState({ name: "", userName: "", password: "" });

    async function addUser(user) {
        try {
            const hasUser = await axios.get(`http://${IP_URL}:3000/users/${user.userName}`);
            Alert.alert("Oops", "This username is already in use");
            return;
        } catch (err) {
            if (err.response?.status === 404) {
                try {
                    await axios.post(`http://${IP_URL}:3000/users`, user);
                    Alert.alert("Success", "User created");
                    router.push("/loginPage");
                } catch (createErr) {
                    Alert.alert("Error", "Sign up failed");
                }
            } else {
                Alert.alert("Error", err.response?.data.message || "Connection failed");
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    placeholder="Full name"
                    style={styles.input}
                    value={newUser.name}
                    onChangeText={(text) => setNewUser((prev) => ({ ...prev, name: text }))}
                />

                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    value={newUser.userName}
                    onChangeText={(text) => setNewUser((prev) => ({ ...prev, userName: text }))}
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={newUser.password}
                    onChangeText={(text) => setNewUser((prev) => ({ ...prev, password: text }))}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={() => addUser(newUser)}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/loginPage")}>
                    <Text style={styles.linkText}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
        padding: 20,
    },
    form: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#343a40",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#28a745",
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    linkText: {
        color: "#007bff",
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

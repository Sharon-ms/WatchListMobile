import axios from "axios";
import { useUser } from "./context/UserContext";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
    SafeAreaView,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import Constants from "expo-constants";

export default function LoginPage() {
    const IP_URL = Constants.expoConfig.extra.IP_URL;
    const { loginUser } = useUser();
    const router = useRouter();
    const [user, setUser] = useState({ userName: "", password: "" });

    const handleLogin = async () => {
        try {
            const res = await axios.get(`http://${IP_URL}:3000/users/${user.userName}`);
            const hasUser = res.data;
            if (!hasUser) {
                Alert.alert("You don't have an account");
            } else if (hasUser.password === user.password) {
                loginUser(hasUser);
                router.push(`/`);
            } else {
                Alert.alert("Wrong password");
            }
        } catch (err) {
            if (err.response?.status === 404) {
                Alert.alert("You don't have an account");
            } else {
                Alert.alert("Connection error");
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={user.userName}
                    onChangeText={(text) => setUser(prev => ({ ...prev, userName: text }))}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={user.password}
                    onChangeText={(text) => setUser(prev => ({ ...prev, password: text }))}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/registerPage")}>
                    <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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
        backgroundColor: "#007bff",
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

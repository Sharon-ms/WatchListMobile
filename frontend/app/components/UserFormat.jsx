import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Constants from 'expo-constants';

export default function UserFormat({ user }) {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const router = useRouter()
    const [name, setName] = useState(null)
    function avatar(item) {
        const words = item.trim().split(' ');
        if (words.length === 1) {
            setName(words[0][0].toUpperCase())
        }
        else {
            setName(words[0][0].toUpperCase() + words[1][0].toUpperCase())
        }
    }
    useEffect(() => {
        avatar(user.userName)
    }, [])

    return (
        <TouchableOpacity onPress={() => router.push('profile')}>
            {
                user.photo ? <Image source={{ uri:`http://${IP_URL}:3000${user.photo}` }} style={{ width: 30,height: 30, borderRadius: 50 }} /> :
                    <View style={styles.avatar}>
                        <Text style={styles.font}>{name}</Text>
                    </View>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: "blue",
        alignItems: "center",
        padding: 5
    },
    font: {
        color: "white"
    }
})
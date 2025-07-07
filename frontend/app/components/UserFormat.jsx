import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
export default function UserFormat({ user }) {
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
        <TouchableOpacity onPress={()=> router.push('details')}>
            <View style={styles.avatar}>
                <Text style={styles.font}>{name}</Text>
            </View>
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
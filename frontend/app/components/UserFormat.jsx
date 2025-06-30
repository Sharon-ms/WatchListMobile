import { View, StyleSheet, Text } from "react-native";
export default function UserFormat({user}){
    const words = user.trim().split(' ');
    let name = "";
    if(words.length === 1){
        name = words[0][0].toUpperCase()
    }
    else{
        name = words[0][0].toUpperCase() + words[1][0].toUpperCase()
    }
    return(
        <View style={styles.avatar}>
            <Text style={styles.font}>{name}</Text>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar:{
        width:30,
        height:30,
        borderRadius:50,
        backgroundColor:"blue",
        alignItems:"center",
        padding:5
    },
    font:{
        color:"white"
    }
})
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export default function EpisodeFormat({ episode }) {
    const { addToWatchList, watchList } = useUser();
    const isWatched = watchList.filter(wl=> wl.episodeId === episode._id)
    useEffect(()=>{
        console.log(isWatched)
    },[])
    return (
        <SafeAreaView style={styles.card}>
            <Text>Episode {episode.episodeNum}</Text>
            <Text>{episode.title}</Text>
             <TouchableOpacity 
                style={styles.mark} 
                onPress={() => addToWatchList(episode._id)}
            >
                <Text>
                    {isWatched.length === 0 ? "M" : "R"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        backfaceVisibility: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 10
    },
    mark:{
        backgroundColor: "red",
        height:20,
        width: 20
    }
})
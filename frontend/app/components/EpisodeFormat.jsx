import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";


export default function EpisodeFormat({ episode }) {
    const { addToWatchList, watchList, isAuthenticated, deleteFromWatchList } = useUser();
    const isWatched = watchList.some(wl => wl.episodeId === episode._id);

    return (
        <SafeAreaView style={styles.card}>
            <Text style={styles.episodeNum}>Episode {episode.episodeNum}</Text>
            <Text style={styles.title}>{episode.title}</Text>

            {/* <TouchableOpacity
                style={[styles.mark, isWatched ? styles.markWatched : styles.markUnwatched]}
                onPress={() =>{ isAuthenticated ? ( checkAlreadyWatched(episode) ? deleteFromWatchList(episode._id) : addToWatchList(episode._id) ) : Alert.alert("please log in first")}}
                accessibilityLabel={isWatched ? "Mark as unwatched" : "Mark as watched"}
            >
                <Text style={styles.markText}>
                    {isWatched ? "✓" : "+"}
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={[
                    styles.mark,
                    isWatched ? styles.markWatched : styles.markUnwatched,
                ]}
                onPress={() => {
                    if (!isAuthenticated) {
                        Alert.alert("Please log in first");
                        return;
                    }

                    if (isWatched) {
                        deleteFromWatchList(episode._id);
                    } else {
                        addToWatchList(episode._id);
                    }


                }}
                accessibilityLabel={isWatched ? "Mark as unwatched" : "Mark as watched"}
            >
                <Text style={styles.markText}>{isWatched ? "✓" : "+"}</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    episodeNum: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333"
    },
    title: {
        fontSize: 16,
        color: "#666",
        flexShrink: 1,
        marginHorizontal: 10
    },
    mark: {
        height: 28,
        width: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center"
    },
    markWatched: {
        backgroundColor: "green"
    },
    markUnwatched: {
        backgroundColor: "red"
    },
    markText: {
        color: "#fff",
        fontWeight: "bold"
    }
});

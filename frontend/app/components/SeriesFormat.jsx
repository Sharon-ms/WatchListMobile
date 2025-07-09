import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../context/UserContext";
import seriesPage from "../seriesDetails/[seriesPage]";

export default function SeriesFormat({ series, lastWatchedEpisode}) {
  
  const { addToFavorites, isAuthenticated, favorites, deleteFavorite } = useUser();
  const isFavorite = favorites.some(fav => fav.seriesId === series._id)
  if (!series) return null;
  const router = useRouter()

  return (
    <TouchableOpacity onPress={() => router.push({
      pathname: `seriesDetails/${series._id}`,
      params: {
        seriesID: series._id,
        startSeason: lastWatchedEpisode?.seasonNum ?? 1
      }
    })}>
      <View style={styles.card}>
        <Text style={styles.title}>{series.title}</Text>
        <Text style={styles.genre}>{series.genre}</Text>
        <Image
          source={{ uri: series.image }}
          style={styles.image} />
        {lastWatchedEpisode && (
          <Text style={styles.lastWatched}>
            Last watched: S{lastWatchedEpisode.seasonNum}E{lastWatchedEpisode.episodeNum}
          </Text>
        )}
        <TouchableOpacity style={styles.mark}
          onPress={() => {
            if (!isAuthenticated) {
              Alert.alert("Please log in first");
              return;
            }

            if (isFavorite) {
              deleteFavorite(series._id);
            } else {
              addToFavorites(series._id);
            }
          }}>
          <Text>{!isFavorite ? "👁️" : "🚫"}</Text>
        </TouchableOpacity>

      </View >
    </TouchableOpacity >

  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  genre: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  mark: {
    height: 28,
    width: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  lastWatched: {
    fontSize: 12,
    color: "#555",
    marginTop: 5
  }

});

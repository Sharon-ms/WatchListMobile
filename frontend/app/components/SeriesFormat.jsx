import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
export default function SeriesFormat({ series }) {
  if (!series) return null;
  const router = useRouter()
  return (
    <TouchableOpacity onPress={()=> router.push(`seriesDetails/${series._id}`)}>
      <View style={styles.card}>
        <Text style={styles.title}>{series.title}</Text>
        <Text style={styles.genre}>{series.genre}</Text>
        <Image
          source={{ uri: series.image }}
          style={styles.image} />
      </View>
    </TouchableOpacity>

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
    elevation: 2, // עובד רק באנדרואיד
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
  }
});

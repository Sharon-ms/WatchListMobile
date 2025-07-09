import { useUser } from "./context/UserContext";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    SafeAreaView,
    Button,
    ScrollView,
    View,
    Text,
    TextInput,
    FlatList,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";

import UserFormat from "./components/UserFormat";
import SeriesFormat from "./components/SeriesFormat";

export default function HomePage() {
    const router = useRouter();
    const IP_URL = Constants.expoConfig.extra.IP_URL;
    const { user, isAuthenticated, logoutUser, watchList } = useUser();

    const [seriesList, setSeriesList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [watchedSeries, setWatchedSeries] = useState([]);
    const [lastWatchedBySeries, setLastWatchedBySeries] = useState({});
    const [years, setYears] = useState([]);
    const [genres, setGenres] = useState([]);
    const [recentSeries, setRecentSeries] = useState([]);
    const [comedySeries, setComedySeries] = useState([]);
    const [dramaSeries, setDramaSeries] = useState([]);

    useEffect(() => {
        getSeries();
        if (isAuthenticated && user) {
            getWatchedSeries(user._id);
        }
    }, [user, watchList]);

    async function getSeries() {
        try {
            const response = await axios.get(`http://${IP_URL}:3000/series`);
            const data = response.data;
            setSeriesList(data);

            const currentYear = new Date().getFullYear();
            setYears([...new Set(data.map((s) => s.year).filter(Boolean))].sort((a, b) => b - a));
            const allGenres = data.flatMap((s) => s.genre || []);
            setGenres([...new Set(allGenres)]);
            setRecentSeries(data.filter((s) => Number(s.year) >= currentYear - 1));
            setComedySeries(data.filter((s) => s.genre?.map((g) => g.toLowerCase()).includes("comedy")));
            setDramaSeries(data.filter((s) => s.genre?.map((g) => g.toLowerCase()).includes("drama")));
        } catch (err) {
            console.log("Error fetching series:", err);
        }
    }

    const filteredSeries = seriesList.filter((s) => {
        const matchesTitle = s.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear ? s.year?.toString() === selectedYear : true;
        const matchesGenre = selectedGenre ? s.genre?.includes(selectedGenre) : true;
        return matchesTitle && matchesYear && matchesGenre;
    });

    async function getWatchedSeries(userId) {
        try {
            const results = await Promise.all(
                watchList.map(ep =>
                    axios.get(`http://${IP_URL}:3000/episodes/${ep.episodeId}`)
                )
            );
            const episodeData = results.map(res => res.data);
            const allSeriesData = await axios.get(`http://${IP_URL}:3000/series`);
            const allSeries = allSeriesData.data;
            const seriesIds = [...new Set(episodeData.map(ep => ep.seriesId))];
            const filterSeries = allSeries.filter(s => seriesIds.includes(s._id));
            setWatchedSeries(filterSeries);
            const episodesBySeries = {};
            episodeData.forEach(ep => {
                if (!episodesBySeries[ep.seriesId]) {
                    episodesBySeries[ep.seriesId] = [];
                }
                episodesBySeries[ep.seriesId].push(ep);
            });
            const lastWatchedBySeries = {};
            for (const seriesId in episodesBySeries) {
                lastWatchedBySeries[seriesId] = findLastEpisode(episodesBySeries[seriesId]);
            }
            setLastWatchedBySeries(lastWatchedBySeries);
        } catch (err) {
            console.log("Error fetching watched series:", err);
        }
    }

    function findLastEpisode(episodes) {
        return episodes.reduce((latest, current) => {
            if (
                current.seasonNum > latest.seasonNum ||
                (current.seasonNum === latest.seasonNum &&
                    current.episodeNum > latest.episodeNum)
            ) {
                return current;
            }
            return latest;
        }, episodes[0]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardWrapper}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                        <View style={styles.headerRow}>
                            {isAuthenticated && <UserFormat user={user} />}
                            {isAuthenticated && <Button title="Log out" onPress={logoutUser} />}
                            {!isAuthenticated && <Button title="Login" onPress={() => router.push("/loginPage")} />}
                        </View>

                        <View style={styles.advancedButton}>
                            <Button
                                title={showAdvancedSearch ? "Back" : "Advanced Search"}
                                onPress={() => {
                                    setShowAdvancedSearch((prev) => !prev);
                                    setSearchQuery("");
                                    setSelectedYear("");
                                    setSelectedGenre("");
                                }}
                            />
                        </View>

                        {showAdvancedSearch ? (
                            <>
                                <TextInput
                                    placeholder="Search by title"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    style={styles.input}
                                />

                                <View style={styles.pickerContainer}>
                                    <View style={styles.pickerItem}>
                                        <Text style={styles.pickerLabel}>Year</Text>
                                        <Picker
                                            selectedValue={selectedYear}
                                            onValueChange={setSelectedYear}
                                        >
                                            <Picker.Item label="All" value="" />
                                            {years.map((year) => (
                                                <Picker.Item
                                                    key={year}
                                                    label={year.toString()}
                                                    value={year.toString()}
                                                />
                                            ))}
                                        </Picker>
                                    </View>

                                    <View style={styles.pickerItem}>
                                        <Text style={styles.pickerLabel}>Genre</Text>
                                        <Picker
                                            selectedValue={selectedGenre}
                                            onValueChange={setSelectedGenre}
                                        >
                                            <Picker.Item label="All" value="" />
                                            {genres.map((genre) => (
                                                <Picker.Item key={genre} label={genre} value={genre} />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>

                                <Text style={styles.sectionTitle}>Search Results</Text>
                                <FlatList
                                    data={filteredSeries}
                                    keyExtractor={(item) => item._id?.toString() ?? item.title}
                                    renderItem={({ item }) => (
                                        <View style={styles.seriesCard}>
                                            <SeriesFormat series={item} />
                                        </View>
                                    )}
                                    numColumns={3}
                                    columnWrapperStyle={{ justifyContent: "space-between" }}
                                />
                            </>
                        ) : (
                            <>
                                {isAuthenticated && Object.keys(lastWatchedBySeries).length > 0 && (
                                    <>
                                        <Text style={styles.sectionTitle}>Continue Watching</Text>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                            {Object.entries(lastWatchedBySeries).map(([seriesId, lastEpisode]) => {
                                                const series = seriesList.find(s => s._id === seriesId);
                                                if (!series) return null;
                                                return (
                                                    <View key={seriesId} style={styles.horizontalCard}>
                                                        <SeriesFormat series={series} lastWatchedEpisode={lastEpisode} />
                                                    </View>
                                                );
                                            })}
                                        </ScrollView>
                                    </>
                                )}

                                <Text style={styles.sectionTitle}>Recent Releases</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                    {recentSeries.map((s, index) => (
                                        <View key={s._id || index} style={styles.horizontalCard}>
                                            <SeriesFormat series={s} />
                                        </View>
                                    ))}
                                </ScrollView>

                                <Text style={styles.sectionTitle}>Comedy</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                    {comedySeries.map((s, index) => (
                                        <View key={s._id || index} style={styles.horizontalCard}>
                                            <SeriesFormat series={s} />
                                        </View>
                                    ))}
                                </ScrollView>

                                <Text style={styles.sectionTitle}>Drama</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                    {dramaSeries.map((s, index) => (
                                        <View key={s._id || index} style={styles.horizontalCard}>
                                            <SeriesFormat series={s} />
                                        </View>
                                    ))}
                                </ScrollView>
                            </>
                        )}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    keyboardWrapper: {
        flex: 1,
    },
    scrollContainer: {
        padding: 10,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    advancedButton: {
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    btn: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden"
    },
    pickerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 10,
    },
    pickerItem: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 8,
        overflow: "hidden",
        paddingHorizontal: 4,
    },
    pickerLabel: {
        fontWeight: "500",
        marginBottom: 4,
        color: "#495057",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: 10,
        color: "#343a40",
    },
    seriesCard: {
        width: (Dimensions.get("window").width - 40) / 3,
        marginBottom: 15,
    },
    horizontalScroll: {
        marginBottom: 20,
    },
    horizontalCard: {
        marginRight: 10,
    },
});

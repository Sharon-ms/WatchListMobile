import { useUser } from "./context/UserContext";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView, Button, ScrollView, View, Text, TextInput, FlatList } from "react-native";
import axios from "axios";
import UserFormat from "./components/UserFormat";
import SeriesFormat from "./components/SeriesFormat";
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';


export default function HomePage() {

    const router = useRouter()
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { user, isAuthenticated, logoutUser } = useUser()
    const [seriesList, setSeriesList] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const currentYear = new Date().getFullYear();
    const [years, setYears] = useState([]);
    const [genres, setGenres] = useState([]);
    const [recentSeries, setRecentSeries] = useState([]);

    async function getSeries() {
        try {
            const response = await axios.get(`http://${IP_URL}:3000/series`);
            const data = response.data;
            setSeriesList(data);

            // חישוב שנים
            const uniqueYears = [...new Set(data.map(s => s.year).filter(Boolean))].sort((a, b) => b - a);
            setYears(uniqueYears);

            // חישוב ז'אנרים
            const uniqueGenres = [...new Set(data.map(s => s.genre).filter(Boolean))];
            setGenres(uniqueGenres);

            // חישוב סדרות מהשנה האחרונה
            const currentYear = new Date().getFullYear();
            const recent = data.filter(s => Number(s.year) >= currentYear - 1);
            setRecentSeries(recent);

        } catch (err) {
            console.log("error", err);
        }
    }

    const filteredSeries = seriesList.filter((s) => {
        const matchesTitle = s.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear ? s.year?.toString() === selectedYear : true;
        const matchesGenre = selectedGenre ? s.genre === selectedGenre : true;
        return matchesTitle && matchesYear && matchesGenre;
    });

    useEffect(() => {
        getSeries()
    }, [])


    return (
        <SafeAreaView>
            <ScrollView>
                {
                    isAuthenticated ? <View> <UserFormat user={user} /> <Button title="log out" onPress={() => logoutUser()} /></View> : <Button title="login" onPress={() => router.push("/loginPage")} />
                }
                <TextInput
                    placeholder="חפש סדרה לפי שם"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 8,
                        borderRadius: 8,
                        marginBottom: 10
                    }}
                />

                <Text>סינון לפי שנה:</Text>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    style={{ marginBottom: 10 }}
                >
                    <Picker.Item label="הצג הכול" value="" />
                    {years.map((year) => (
                        <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                    ))}
                </Picker>

                <Text>סינון לפי ז'אנר:</Text>
                <Picker
                    selectedValue={selectedGenre}
                    onValueChange={(itemValue) => setSelectedGenre(itemValue)}
                    style={{ marginBottom: 10 }}
                >
                    <Picker.Item label="הצג הכול" value="" />
                    {genres.map((genre) => (
                        <Picker.Item key={genre} label={genre} value={genre} />
                    ))}
                </Picker>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>תוצאות חיפוש / סינון</Text>
                <FlatList
                    data={filteredSeries}
                    keyExtractor={(item) => item._id?.toString() ?? item.title}
                    renderItem={({ item }) => (
                        <View style={{
                            width: (Dimensions.get("window").width - 40) / 3,
                            marginBottom: 15
                        }}>
                            <SeriesFormat series={item} />
                        </View>
                    )}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />


                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {seriesList.map((s, index) => (
                        <SeriesFormat key={s._id || index} series={s} />
                    ))}
                </ScrollView>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>סדרות מהשנה האחרונה</Text>
                <FlatList
                    horizontal
                    data={recentSeries}
                    keyExtractor={(item) => item._id?.toString() ?? item.title}
                    renderItem={({ item }) => (
                        <View style={{ marginRight: 10 }}>
                            <SeriesFormat series={item} />
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 20 }}
                />



            </ScrollView>
        </SafeAreaView>
    )

}
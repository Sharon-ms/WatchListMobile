import { useLocalSearchParams } from "expo-router";
import axios from "axios"
import { useState, useEffect, } from "react";
import { Button, SafeAreaView, Text, TextInput, Alert, ScrollView, Image, StyleSheet } from "react-native";
import EpisodeFormat from "../components/EpisodeFormat";
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';

export default function seriesPage() {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { seriesPage, startSeason, seriesID } = useLocalSearchParams();
    const [episodes, setEpisodes] = useState([])
    const [series, setSeries] = useState([])
    const [seasonsAmount, setSeasonAmount] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState(Number(startSeason) || 1);

    async function getSeries() {
        try {
            const allSeries = await axios.get(`http://${IP_URL}:3000/series`);
            const findSeries = allSeries.data.find(se => se._id === seriesID);
            setSeries(findSeries.data);
        } catch (err) {
            console.error(err.message);
        }
    }
    async function getEpisodes() {
        try {
            const episodesData = await axios.get(`http://${IP_URL}:3000/episodes?seriesId=${seriesPage}`);
            setEpisodes(episodesData.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getSeasonAmount() {
        try {
            if (series) {
                setSeasonAmount(findSeries.seasonsAmount)
            }
            else {
                console.log("series not found")
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getSeries();
        getEpisodes();
        getSeasonAmount();
        setSelectedSeason(Number(startSeason) || 1);
    }, [seriesPage]);
    let filterEpisodes = episodes.filter(ep => ep.seasonNum === selectedSeason)
    const seasonArray = Array.from({ length: seasonsAmount })
    return (
        <SafeAreaView>
            <ScrollView>
                {}
                <Image
                    source={{ uri: series.image }}
                    style={styles.image} />
                <Text>{series.title}</Text>
                <Picker
                    selectedValue={selectedSeason}
                    onValueChange={(itemValue) => setSelectedSeason(itemValue)}
                    style={{ marginVertical: 10 }}
                >
                    {seasonArray.map((_, index) => (
                        <Picker.Item
                            key={index}
                            label={`Season: ${index + 1}`}
                            value={index + 1}
                        />
                    ))}
                </Picker>
                <Text>season {selectedSeason}</Text>
                {filterEpisodes.length > 0 ? (
                    filterEpisodes.map((ep, index) => <EpisodeFormat key={index} episode={ep} />)
                ) : (<Text>no episodes to this season</Text>)

                }
            </ScrollView>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    }
});
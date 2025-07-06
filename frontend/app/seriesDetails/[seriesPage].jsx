import { useLocalSearchParams } from "expo-router";
import axios from "axios"
import { useState, useEffect, } from "react";
import { Button, SafeAreaView, Text, TextInput, Alert, ScrollView } from "react-native";
import EpisodeFormat from "../components/EpisodeFormat";
import Constants from 'expo-constants';

export default function seriesPage() {
<<<<<<< HEAD
    const IP_URL = Constants.expoConfig.extra.IP_URL
=======
    const IP = "172.19.37.90"
>>>>>>> 070e0c35fc65923b8c66017463d9784b0ee38f4e
    const { seriesPage } = useLocalSearchParams();
    const [episodes, setEpisodes] = useState([])
    const [seasonsAmount, setSeasonAmount] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState(null)
    async function getEpisodes() {
        try {
<<<<<<< HEAD
            const episodesData = await axios.get(`http://${IP_URL}:3000/episodes?seriesId=${seriesPage}`);
=======
            const episodesData = await axios.get(`http://172.19.37.90:3000/episodes?seriesId=${seriesPage}`);
>>>>>>> 070e0c35fc65923b8c66017463d9784b0ee38f4e
            setEpisodes(episodesData.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getSeasonAmount() {
        try {
            const series = await axios.get(`http://${IP_URL}:3000/series`);
            const findSeries = series.data.find(se => se._id === seriesPage);
            if (findSeries) {
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
        getEpisodes();
        getSeasonAmount();
        setSelectedSeason(1);
    }, [seriesPage]);
    let filterEpisodes = episodes.filter(ep => ep.seasonNum === selectedSeason)
    const seasonArray = Array.from({ length: seasonsAmount })
    return (
        <SafeAreaView>
            <ScrollView>
            {
                seasonArray.map((_, index) => (
                    <Button key={index}
                        title={`Season: ${index + 1}`}
                        onPress={() => {
                            setSelectedSeason(index + 1);
                        }} />
                ))
            }
            <Text>season {selectedSeason}</Text>
            {filterEpisodes.length > 0 ? (
                filterEpisodes.map((ep, index) => <EpisodeFormat key={index} episode={ep} />)
            ) : (<Text>no episodes to this season</Text>)

            }
            </ScrollView>
        </SafeAreaView>

    )

}

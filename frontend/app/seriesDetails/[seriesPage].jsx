import { useLocalSearchParams } from "expo-router";
import axios from "axios"
import { useState, useEffect } from "react";
import { Button, SafeAreaView, Text, TextInput, Alert } from "react-native";
import EpisodeFormat from "../components/EpisodeFormat";

export default function seriesPage() {
    const IP = "  192.168.150.128"
    const { seriesPage } = useLocalSearchParams();
    const [episodes, setEpisodes] = useState([])
    const [seasonsAmount, setSeasonAmount] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState(null)
    async function getEpisodes() {
        try {
            const episodesData = await axios.get(`http://192.168.150.128:3000/episodes?seriesId=${seriesPage}`);
            setEpisodes(episodesData.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getSeasonAmount() {
        try {
            const series = await axios.get(`http://192.168.150.128:3000/series`);
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
    }, [seriesPage]);
    let filterEpisodes = [0];
    filterEpisodes = episodes.filter(ep => ep.seasonNum === selectedSeason)
    const seasonArray = Array.from({length: seasonsAmount})
    return (
        <SafeAreaView>
            {
                seasonArray.map((_, index) => (
                    <Button key={index}
                        title={`Season: ${index + 1}`}
                        onPress={() => {
                            setSelectedSeason(index + 1);
                        }} />
                ))
            }
            {filterEpisodes.length > 0 ? (
                filterEpisodes.map((ep, index) => <EpisodeFormat key={index} episode={ep} />)
            ) : (<Text>no episodes to this season</Text>)

            }
        </SafeAreaView>

    )

}

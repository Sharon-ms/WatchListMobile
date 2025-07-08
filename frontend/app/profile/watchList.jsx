import { Text, SafeAreaView, FlatList } from "react-native";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import SeriesFormat from "../components/SeriesFormat"
import Constants from 'expo-constants';

export default function WatchList() {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { watchList } = useUser();
    const [series, setSeries] = useState([]);

    useEffect(() => {
        async function fetchEpisodes() {
            try {
                const results = await Promise.all(
                    watchList.map(ep =>
                        axios.get(`http://${IP_URL}:3000/episodes/${ep.episodeId}`)
                    )
                );
                const episodeData = results.map(res => res.data);
                const allSeriesData = await axios.get(`http://${IP_URL}:3000/series`);
                const allSeries = allSeriesData.data;
                const seriesIds = [...new Set(episodeData.map(ep => ep.seriesId))]
                const filterSeries = allSeries.filter(s => seriesIds.includes(s._id))
                setSeries(filterSeries);
            } catch (err) {
                console.error(err);
            }
        }

        if (watchList.length > 0) {
            fetchEpisodes();
        }
    }, [watchList]);

    return (
        <SafeAreaView>
            <Text>My WatchList</Text>
            {/* <FlatList
                data={episodes}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
            /> */}
            {
                series.map((s, index) => <SeriesFormat key={index} series={s} />)
            }
        </SafeAreaView>
    );
}

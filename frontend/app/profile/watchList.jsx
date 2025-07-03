import { Text, SafeAreaView, FlatList } from "react-native";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import SeriesFormat from "../components/SeriesFormat"

export default function WatchList() {
    const { watchList } = useUser();
    const [episodes, setEpisodes] = useState([]);
    const [series, setSeries] = useState([]);
    const allSeriesData = axios.get("http://172.19.37.91:3000/series");
    const allSeries = allSeriesData.data;
    const seriesIds = [...new Set(episodes.map(ep=>ep.seriesId))]
    const filterSeries = allSeries.filter(s=> seriesIds.includes(s._id))
    setSeries(filterSeries);
    useEffect(() => {
        async function fetchEpisodes() {
            try {
                const results = await Promise.all(
                    watchList.map(ep =>
                        axios.get(`http://172.19.37.90:3000/episodes/${ep.episodeId}`)
                    )
                );
                const episodeData = results.map(res => res.data);
                setEpisodes(episodeData);
                // const seriesResult = await Promise.all(
                //     episodeData.map(ed =>
                //         axios.get(`http:// 172.19.37.91:3000/series/${ed.seriesId}`)
                //     )
                // );
                // const seriesChack = seriesResult.filter(s =>
                //     !seriesChack.some(existing => JSON.stringify(existing) === JSON.stringify(s))
                // );
                // const seriesData = seriesChack.map(sc=> sc.data);
                // setSeries(seriesData)
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
                series.map((s, index)=> <SeriesFormat key={index} series={s}/>)
            }
        </SafeAreaView>
    );
}

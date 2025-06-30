import { Text, SafeAreaView, FlatList } from "react-native";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WatchList() {
    const { watchList } = useUser();
    const [episodes, setEpisodes] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        async function fetchEpisodes() {
            try {
                const results = await Promise.all(
                    watchList.map(ep =>
                        axios.get(`http://10.0.0.15:3000/episodes/${ep.episodeId}`)
                    )
                );
                const episodeData = results.map(res => res.data);
                setEpisodes(episodeData);
                // const seriesResult = await Promise.all(
                //     episodeData.map(ed =>
                //         axios.get(`http://192.168.150.128:3000/series/${ed.seriesId}`)
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
            <FlatList
                data={episodes}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
            />
        </SafeAreaView>
    );
}

import { useLocalSearchParams } from "expo-router";
import axios from "axios"
import { useState, useEffect } from "react";
import { Button, SafeAreaView, Text } from "react-native";

export default function seriesPage() {
    const { seriesPage } = useLocalSearchParams();
    const [episodes, setEpisodes] = useState([])
    const [seasonsAmount, setSeasonsAmount] = useState(0);
    const [selectedSeason, setSelectedSeason] = useState(null)

    async function getEpisodes() {
        try {
            const episodesData = await axios.get(`http://192.168.150.128:3000/episodes?seriesId=${seriesPage}`);
            setEpisodes(episodesData.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    // async function getSeasonsAmount(id) {
    //     try{
    //         const series = await axios.get(`http://192.168.150.128:3000/series/${id}`);
    //         setSeasonsAmount(series.data.seasonsAmount);
    //     }catch(err){
    //         console.error(err.message)
    //     }
    // }

    useEffect(() => {
        getEpisodes();
        // getSeasonsAmount(_id);
    }, [seriesPage]);

    // const filterEpisodes = episodes.filter(ep => ep.seasonNum === selectedSeason)
    // const seasonArray = Array.from({length: seasonsAmount})
    return (
        <SafeAreaView>
           {
            episodes.map(e=>(<Text>{e.title}</Text>))
           }
        </SafeAreaView>
        
    )

}

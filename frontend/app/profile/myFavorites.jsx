import { useUser } from "../context/UserContext";
import axios from "axios";
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import SeriesFormat from "../components/SeriesFormat";
export default function myFavorites() {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { favorites } = useUser()
    const [series, setSeries] = useState([])
    async function getFavorites() {
        try {
            const results = await Promise.all(
                favorites.map(fav =>
                    axios.get(`http://${IP_URL}:3000/series/${fav.seriesId}`)
                ));
            const seriesData = results.map(res=> res.data)
            setSeries(seriesData)
        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(()=>{
        getFavorites()
    },[])

    useEffect(() => {
    console.log("=== Debug Info ===");
    console.log("IP_URL:", IP_URL);
    console.log("favorites:", favorites);
    console.log("favorites length:", favorites?.length);
    
    if (favorites && favorites.length > 0) {
        console.log("First favorite:", favorites[0]);
        console.log("Sample URL:", `http://${IP_URL}:3000/series/${favorites[0].seriesId}`);
    }
}, []);

    return(
        <SafeAreaView>
            <ScrollView>
                {
                    series.map((s, index)=> (<SeriesFormat key={index} series={s}/>))
                }
            </ScrollView>
        </SafeAreaView>
    )
}
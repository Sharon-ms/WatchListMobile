import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import SeriesFormat from "../components/SeriesFormat";
import UserFormat from "../components/UserFormat";
export default function profile() {
    const { user } = useLocalSearchParams()
    const [seriesList, setSeriesList] = useState([])
    async function getSeries() {
        try {
            const seriesDate = await axios.get(`http://10.0.0.15:3000/series`);
            setSeriesList(seriesDate.data);
        } catch (err) {
            console.log("error");
        }

    }
    useEffect(() => {
        getSeries()
    }, [user])
    
    return (
        <SafeAreaView>
            <UserFormat user={user}/>
            {
                seriesList.map((s, index) => (<SeriesFormat key={index} series={s}/>))
            }
        </SafeAreaView>
    )

}
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, ScrollView } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import SeriesFormat from "../components/SeriesFormat";
import UserFormat from "../components/UserFormat";
export default function profile() {
    const { user } = useLocalSearchParams()
    const [seriesList, setSeriesList] = useState([])
    async function getSeries() {
        try {
            const seriesData = await axios.get(`http://172.19.37.90:3000/series`);
            setSeriesList(seriesData.data);
        } catch (err) {
            console.log("error");
        }

    }
    useEffect(() => {
        getSeries()
    }, [user])
    
    return (
        <SafeAreaView>
            <ScrollView>
            <UserFormat user={user}/>
            {
                seriesList.map((s, index) => (<SeriesFormat key={index} series={s}/>))
            }
            </ScrollView>
        </SafeAreaView>
    )

}
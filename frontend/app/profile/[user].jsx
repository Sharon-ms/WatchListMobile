import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, ScrollView } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import SeriesFormat from "../components/SeriesFormat";
import UserFormat from "../components/UserFormat";
import Constants from 'expo-constants';
export default function profile() {
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { user } = useLocalSearchParams()
    const [seriesList, setSeriesList] = useState([])
    async function getSeries() {
        try {
            const seriesDate = await axios.get(`http://${IP_URL}:3000/series`);
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
            <ScrollView>
            
            <UserFormat user={user}/>
            {
                seriesList.map((s, index) => (<SeriesFormat key={index} series={s}/>))
            }
            </ScrollView>
        </SafeAreaView>
    )

}
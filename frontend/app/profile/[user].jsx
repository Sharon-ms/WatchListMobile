import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import SeriesFormat from "../components/SeriesFormat";
export default function profile() {
    const { user } = useLocalSearchParams()
    const [seriesList, setSeriesList] = useState([])
    async function getSeries() {
        try {
<<<<<<< HEAD
            const seriesDate = await axios.get(`http://192.168.56.1:3000/series`);
=======
            const seriesDate = await axios.get(`http://192.168.150.128:3000/series`);
>>>>>>> 3c131ee3405498b534a3b1a49dd9c7e281a0df1c
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
            <Text>Hello {user} </Text>
            {
<<<<<<< HEAD
                seriesList.map((s, index) => (<SeriesFormat key={index} series={s} />))
=======
                seriesList.map((s, index) => (<SeriesFormat key={index} series={s}/>))
>>>>>>> 3c131ee3405498b534a3b1a49dd9c7e281a0df1c
            }
        </SafeAreaView>
    )

}
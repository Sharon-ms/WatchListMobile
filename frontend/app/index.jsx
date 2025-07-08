import { useUser } from "./context/UserContext";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView, Button, ScrollView, View } from "react-native";
import axios from "axios";
import UserFormat from "./components/UserFormat";
import SeriesFormat from "./components/SeriesFormat";
import Constants from 'expo-constants';

export default function HomePage() {

    const router = useRouter()
    const IP_URL = Constants.expoConfig.extra.IP_URL
    const { user, isAuthenticated, logoutUser } = useUser()

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
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                {
                    isAuthenticated ? <View> <UserFormat user={user} /> <Button title="log out" onPress={() => logoutUser()} /></View> : <Button title="login" onPress={() => router.push("/loginPage")} />
                }

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {seriesList.map((s, index) => (
                        <SeriesFormat key={s._id || index} series={s} />
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )

}
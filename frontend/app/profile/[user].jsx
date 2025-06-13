import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import SeriesFormat from "../components/SeriesFormat";
export default function profile(){
    const {user} = useLocalSearchParams()
    const [seriesList, setSeriesList] = useState([])
    async function getSeries(){
        try{
            const seriesDate = await axios.get(`http://192.168.123.156:3000/series`);
            setSeriesList(seriesDate.data);
        }catch(err){
            console.log("error");
        }
        
    }
    useEffect(()=>{
       getSeries()
    },[user])

    return(
        <SafeAreaView>
            <Text>Hello {user} </Text>
            {
                seriesList.map((s, index)=>(<SeriesFormat key={index} series={s}/>))
            }
        </SafeAreaView>
    )
    
}
import { createContext, useContext, useState } from "react";
import Constants from 'expo-constants';
import axios from "axios";

const IP_URL = Constants.expoConfig.extra.IP_URL
const userContext = createContext();

export function useUser() {
    return useContext(userContext)
}
export function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [watchList, setWatchList] = useState([])
    const [favorites, setFavorites] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function loginUser(userData) {
        setUser(userData)
        setIsAuthenticated(true)
        loadWatchList(userData.userName)
        loadFavorites(userData.userName)
    }

    async function loadWatchList(userName) {
        try {
            const result = await axios.get(`http://${IP_URL}:3000/watched/${userName}`)
            setWatchList(result.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function loadFavorites(userName){
        try{
            const result = await axios.get(`http://${IP_URL}:3000/favorites/${userName}`)
            setFavorites(result.data)
        }catch(err){
            console.error(err.message);
        }
    }

    async function addToWatchList(episodeId) {
        try {
            const newWatched = {
                userName: user.userName,
                episodeId: episodeId
            }
            const alreadyWatched = watchList.some(wl => wl.episodeId === newWatched.episodeId);
            if (alreadyWatched) return;

            await axios.post(`http://${IP_URL}:3000/watched`, newWatched)
            loadWatchList(user.userName);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function daleteFromWatchList(episodeId) {
        try{
            await axios.delete(`http://${IP_URL}:3000/watched?userName=${user.userName}&episodeId=${episodeId}`)
            loadWatchList(user.userName)
        }catch(err){
            console.error(err.message);
        }
    }

    async function addToFavorites(seriesId) {
        try{
            const newFavorite = {
                userName: user.userName,
                seriesId: seriesId
            }
            const alreadyFavorite = favorites.some(f=> f.seriesId === seriesId)
            if(alreadyFavorite) return;
            axios.post(`http://${IP_URL}:3000/favorites`, newFavorite)
            loadFavorites(user.userName)
        }catch(err){
            console.error(err.message)
        }
    }

    function logoutUser() {
        setUser(null);
        setIsAuthenticated(false)
        setWatchList([])
    }

    return (
        <userContext.Provider value={
            {
                user,
                watchList,
                isAuthenticated,
                favorites,
                setUser,
                loadFavorites,
                addToFavorites,
                setIsAuthenticated,
                loginUser,
                loadWatchList,
                addToWatchList,
                logoutUser,
                daleteFromWatchList
            }}>
            {children}
        </userContext.Provider>
    )

}
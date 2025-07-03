import { createContext, useContext, useState } from "react";
import axios from "axios";

const userContext = createContext();

export function useUser() {
    return useContext(userContext)
}
export function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [watchList, setWatchList] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function loginUser(userData) {
        setUser(userData)
        setIsAuthenticated(true)
        loadWatchList(userData.userName)
    }

    async function loadWatchList(userName) {
        try {
            const result = await axios.get(`http://172.19.37.90:3000/watched/${userName}`)
            setWatchList(result.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function addToWatchList(episodeId) {
        try {
            await axios.post(`http://172.19.37.90:3000/watched`,
                {
                    userName: user.userName,
                    episodeId: episodeId
                })
            loadWatchList(user.userName);
        } catch (err) {
            console.error(err.message);
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
                loginUser,
                loadWatchList,
                addToWatchList,
                logoutUser
            }}>
            {children}
        </userContext.Provider>
    )

}
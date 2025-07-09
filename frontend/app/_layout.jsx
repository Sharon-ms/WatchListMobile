import { UserProvider } from "./context/UserContext"
import { Stack } from "expo-router";

export default function appLayout() {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="index" options={{title: "home-page"}}/>
                <Stack.Screen name="loginPage" options={{ title: "login-page" }} />
                <Stack.Screen name="registerPage" options={{ title: "register-page" }} />
                <Stack.Screen name="myFavorites" options={{ title: "my-favorites" }} />
                <Stack.Screen name="seriesDetails/[seriesPage]" options={{ title: "series-page" }} />
                <Stack.Screen name="Photo" options={{title: "user-photo"}}/>
            </Stack >
        </UserProvider>
    )
}


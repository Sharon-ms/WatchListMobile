import { UserProvider } from "./context/UserContext"
import { Stack } from "expo-router";

export default function appLayout() {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="index" options={{title: "home-page"}}/>
                <Stack.Screen name="loginPage" options={{ title: "login-page" }} />
                <Stack.Screen name="registerPage" options={{ title: "register-page" }} />
                <Stack.Screen name="profile" options={{ title: "profile-page" }} />
                <Stack.Screen name="seriesDetails/[seriesPage]" options={{ title: "series-page" }} />
                <Stack.Screen name="details" options={{title: "user-details"}}/>
            </Stack >
        </UserProvider>
    )
}


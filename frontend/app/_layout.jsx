import { Stack } from "expo-router";

export default function appLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "login-page" }} />
            <Stack.Screen name="registerPage" options={{ title: "register-page" }} />
            <Stack.Screen name="profile/[user]" options={{title: "profile-page"}}/>
            <Stack.Screen name="seriesDetails/[seriesPage]" options={{title: "series-page"}}/>
        </Stack>
    )

}


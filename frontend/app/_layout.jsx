import { Stack } from "expo-router";

export default function appLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "login-page" }} />
            <Stack.Screen name="registerPage" options={{ title: "register-page" }} />
<<<<<<< HEAD
    {/* <Stack.Screen name="profile" options={{title: "profile-page"}}/> */ }
=======
            <Stack.Screen name="profile/[user]" options={{title: "profile-page"}}/>
            <Stack.Screen name="seriesDetails/[seriesPage]" options={{title: "series-page"}}/>
>>>>>>> 3c131ee3405498b534a3b1a49dd9c7e281a0df1c
        </Stack >
    )

}


import { Drawer } from "expo-router/drawer"

export default function profileLaout() {
    return (
        <Drawer>
            <Drawer.Screen name="myFavorites" options={{title: "my-favorites"}}/>
            <Drawer.Screen name="details" options={{ title: "user-page" }} />
            <Drawer.Screen name="watchList" options={{ title: "watch-list" }} />
        </Drawer>
    )
}
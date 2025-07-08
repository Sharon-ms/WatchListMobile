import { Drawer } from "expo-router/drawer"

export default function profileLaout() {
    return (
        <Drawer>
            <Drawer.Screen name="details" options={{ title: "user-page" }} />
            <Drawer.Screen name="watchList" options={{ title: "watch-list" }} />
        </Drawer>
    )
}
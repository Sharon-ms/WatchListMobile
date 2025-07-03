import { Drawer } from "expo-router/drawer"

export default function profileLayout() {
    return (
        <Drawer>
            <Drawer.Screen name="[user]" options={{ title: "user-page" }} />
            <Drawer.Screen name="watchList" options={{ title: "watch-list" }} />
        </Drawer>
    )
}
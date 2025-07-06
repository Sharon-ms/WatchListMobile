import { useUser } from "./context/UserContext";
import { SafeAreaView, Text } from "react-native";
export default function details() {
    const { user } = useUser()

    return (
        <SafeAreaView>
            <Text>{user.name}</Text>
            <Text>{user.userName}</Text>
            <Text>{user.password}</Text>
        </SafeAreaView>
    )
}
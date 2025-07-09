import { useCameraPermissions } from "expo-camera";
import { View, SafeAreaView, Text } from "react-native";
import { Button } from "react-native-web";
export default function CameraPermission(){
    const [permission, requestPermisiion] = useCameraPermissions()

    if(!permission){
        return (<View/>)
    }

    if(!permission.granted){
        return(
            <SafeAreaView>
                <Text>We need a permission to open the camera</Text>
                <Button title="grant" onPress={requestPermisiion}/>
            </SafeAreaView>
        )
    }
}
import { CameraView } from "expo-camera";
import { useRef, useState } from 'react';
import { useUser } from "./context/UserContext";
import { View, TouchableOpacity, Image, Text, Alert } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';
import CameraPermission from "./components/CameraPermission";
export default function userPhoto() {
    const [imageUri, setImageUri] = useState(null);
    const cameraRef = useRef();
    const { user } = useUser()
    const IP_URL = Constants.expoConfig.extra.IP_URL;

    async function takePicture() {
        if (cameraRef.current) {
            const picture = await cameraRef.current.takePictureAsync();
            setImageUri(picture.uri);
        }
    };

    const uploadImage = async () => {
    if (!imageUri) return;

    const formData = new FormData();
    formData.append('photo', {
        uri: imageUri,
        name: `${user.userName}.jpg`,
        type: 'image/jpeg',
    });

    try {
        console.log('Sending request...');
        
        const response = await axios.put(`http://${IP_URL}:3000/users/photo/${user.userName}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 30000, // 30 שניות
        });
        
        console.log('Response received:', response.status);
        console.log('Response data:', response.data);
        
        Alert.alert('Success', 'Profile picture uploaded!');
    } catch (err) {
        console.log('Error caught:', err.response?.status, err.response?.data || err.message);
        Alert.alert('Error', 'Failed to upload image');
    }
};
    return (
        <View>
            <CameraPermission />
            {!imageUri ? (
                <CameraView ref={cameraRef} facing="front" />
            ) : (
                <Image source={{ uri: imageUri }} style={{width:50, height:50, borderRadius:80}} />
            )}
            <View>
                {!imageUri ? (
                    <TouchableOpacity onPress={takePicture}>
                        <Text>Take Picture</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity onPress={() => setImageUri(null)}>
                            <Text>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={uploadImage}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    )
}
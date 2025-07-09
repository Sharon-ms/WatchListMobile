import { CameraView } from "expo-camera";
import { useRef, useState } from 'react';
import { useUser } from "./context/UserContext";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Image, Text, Alert, StyleSheet } from "react-native";
import axios from 'axios';
import Constants from 'expo-constants';
import CameraPermission from "./components/CameraPermission";

export default function UserPhoto() {
    const router = useRouter()
    const [imageUri, setImageUri] = useState(null);
    const cameraRef = useRef();
    const { user } = useUser();
    const IP_URL = Constants.expoConfig.extra.IP_URL;

    async function takePicture() {
        if (cameraRef.current) {
            const picture = await cameraRef.current.takePictureAsync();
            setImageUri(picture.uri);
        }
    }

    const uploadImage = async () => {
        if (!imageUri) return;

        const formData = new FormData();
        formData.append('photo', {
            uri: imageUri,
            name: `${user.userName}.jpg`,
            type: 'image/jpeg',
        });

        try {
            const response = await axios.put(`http://${IP_URL}:3000/users/photo/${user.userName}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 30000,
            });

            Alert.alert('Success', 'Profile picture uploaded!');
            router.push('profile');
        } catch (err) {
            console.log('Upload error:', err.response?.status, err.response?.data || err.message);
            Alert.alert('Error', 'Failed to upload image');
        }
    };

    return (
        <View style={styles.container}>
            <CameraPermission />
            {!imageUri ? (
                <CameraView
                    ref={cameraRef}
                    facing="front"
                    style={styles.camera}
                />
            ) : (
                <Image source={{ uri: imageUri }} style={styles.preview} />
            )}

            <View style={styles.buttonsContainer}>
                {!imageUri ? (
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.buttonText}>📸 Take Picture</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => setImageUri(null)}>
                            <Text style={styles.buttonText}>🔁 Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={uploadImage}>
                            <Text style={styles.buttonText}>💾 Save</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        alignItems: 'center',
    },
    camera: {
        width: '90%',
        height: 400,
        borderRadius: 16,
        overflow: 'hidden',
    },
    preview: {
        width: 300,
        height: 300,
        borderRadius: 16,
        marginVertical: 20,
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

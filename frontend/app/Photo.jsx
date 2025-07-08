// screens/UploadPhotoScreen.js

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useUser } from '../app/context/UserContext';

export default function UploadPhotoScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("צריך הרשאה למצלמה כדי להמשיך");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: false,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    setLoading(true);

    try {
      // נשלח את כתובת ה-URI כמו שהיא - נניח שאתה מקבל URI כזה ושומר אותו
      await axios.put(`http://${Constants.expoConfig.extra.IP_URL}:3000/users/photo/${user.userName}`, {
        photo: image,
      });

      setUser({ ...user, photo: image }); // עדכון בקונטקסט
      Alert.alert("הצלחה", "תמונת הפרופיל עודכנה!");
      router.back(); // חזרה למסך הקודם
    } catch (err) {
      console.error(err);
      Alert.alert("שגיאה", "לא הצלחנו להעלות את התמונה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>צילום תמונת פרופיל</Text>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <Button title="📸 פתח מצלמה" onPress={pickImage} />

      {image && !loading && (
        <Button title="⬆️ העלה לשרת" onPress={uploadImage} />
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200,
    margin: 20,
    borderRadius: 100
  }
});

import { useState } from "react";
import { useUser } from "../context/UserContext";
import {
  SafeAreaView,
  Text,
  Button,
  Modal,
  TextInput,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import UserFormat from "../components/UserFormat";

export default function Details() {
  const IP_URL = Constants.expoConfig.extra.IP_URL;
  const { user, setIsAuthenticated } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePassword = async () => {
    try {
      if (currentPass !== user.password) {
        return Alert.alert("Wrong password");
      }
      if (newPass !== confirmPass) {
        return Alert.alert("Passwords don't match");
      }
      await axios.put(`http://${IP_URL}:3000/users/${user.userName}`, {
        newPassword: newPass,
      });
      Alert.alert("Password changed");
      setShowModal(false);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (err) {
      Alert.alert(err.response?.data?.message || "Connection error");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://${IP_URL}:3000/users/${user.userName}`);
      await axios.delete(`http://${IP_URL}:3000/watched/${user.userName}`);
      Alert.alert("Account deleted");
      setIsAuthenticated(false);
      router.push("/");
    } catch (err) {
      Alert.alert(err.response?.data?.message || "Connection error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>My Account</Text>
        <UserFormat user={user} />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/userPhoto")}
        >
          <Text style={styles.buttonText}>Add Picture</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Name: {user.name}</Text>
          <Text style={styles.infoText}>Username: {user.userName}</Text>
          <Text style={styles.infoText}>Password: {user.password}</Text>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <Modal visible={showModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>

              <TextInput
                style={styles.input}
                placeholder="Current Password"
                value={currentPass}
                onChangeText={setCurrentPass}
                secureTextEntry
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPass}
                onChangeText={setNewPass}
                secureTextEntry
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPass}
                onChangeText={setConfirmPass}
                secureTextEntry
                autoCapitalize="none"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.primaryButton, { flex: 1, marginRight: 5 }]}
                  onPress={handleChangePassword}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.secondaryButton, { flex: 1, marginLeft: 5 }]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.dangerButton, { marginTop: 20 }]}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40",
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#212529",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
  },
  dangerButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

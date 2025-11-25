// screens/Settings/SettingsScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

export default function SettingsScreen() {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not sign out.");
    }
  };



  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={{ width: 28 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#111",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: { color: "white", fontSize: 20, fontWeight: "600" },

  content: { marginTop: 40, paddingHorizontal: 20 },

  logoutButton: {
    backgroundColor: "#6C4EFF",
    paddingVertical: 16,
    borderRadius: 12,
  },

  logoutText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

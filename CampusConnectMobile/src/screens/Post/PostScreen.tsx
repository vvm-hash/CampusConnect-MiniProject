// screens/Post/PostScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function PostScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      {/* 🔹 Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* 🔹 Body */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("CreateProject")}
      >
        <Text style={styles.text}>📁 Projects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Threads")}
      >
        <Text style={styles.text}>💬 Threads</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },

  /* HEADER */
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },

  /* OPTIONS */
  card: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});

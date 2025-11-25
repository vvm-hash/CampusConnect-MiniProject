import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function PostDetailsScreen() {
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();

  const project = params.project;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Project Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{project.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{project.description}</Text>

        <Text style={styles.label}>Tech Stack</Text>
        <Text style={styles.value}>{project.techStack}</Text>

        {project.githubLink ? (
          <>
            <Text style={styles.label}>GitHub</Text>
            <Text style={[styles.value, { color: "#6C9EFF" }]}>{project.githubLink}</Text>
          </>
        ) : null}

        {/* USER PROFILE BUTTON */}
        <TouchableOpacity
          style={styles.userButton}
          onPress={() =>
            navigation.navigate("UserProfile", { uid: project.userId })
          }
        >
          <Ionicons name="person-circle-outline" size={22} color="#fff" />
          <Text style={styles.userButtonText}>View Creator Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#111",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "600" },
  label: { color: "#aaa", marginTop: 20, fontSize: 14 },
  value: { color: "#fff", marginTop: 6, fontSize: 16 },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 10,
  },
  userButtonText: { color: "#fff", marginLeft: 10, fontSize: 16 },
});

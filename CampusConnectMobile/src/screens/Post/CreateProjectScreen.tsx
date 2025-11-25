// screens/Post/CreateProjectScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function CreateProjectScreen() {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateProject = async () => {
    if (!title.trim() || !desc.trim()) {
      Alert.alert("Error", "Project title and description are required.");
      return;
    }

    setLoading(true);

    try {
      const user = auth().currentUser;

      await firestore().collection("projects").add({
        title,
        description: desc,
        techStack: tech,
        githubLink: github,
        userId: user?.uid ?? "unknown",
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert("Success", "Project created!");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not create project.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Project</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* FORM */}
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.label}>Project Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Smart Parking System"
          placeholderTextColor="#777"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Explain your project..."
          placeholderTextColor="#777"
          multiline
          value={desc}
          onChangeText={setDesc}
        />

        <Text style={styles.label}>Tech Stack</Text>
        <TextInput
          style={styles.input}
          placeholder="React Native, Firebase, etc."
          placeholderTextColor="#777"
          value={tech}
          onChangeText={setTech}
        />

        <Text style={styles.label}>GitHub Link (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="https://github.com/username/project"
          placeholderTextColor="#777"
          value={github}
          onChangeText={setGithub}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateProject}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Create Project"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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

  label: {
    color: "#aaa",
    marginTop: 20,
    marginBottom: 6,
    fontSize: 14,
  },

  input: {
    backgroundColor: "#1A1A1A",
    color: "white",
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#6C4EFF",
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});

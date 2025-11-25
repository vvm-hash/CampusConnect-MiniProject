// screens/Home/PostCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  githubLink?: string;
  userId: string;
  createdAt?: any;
};

export default function PostCard({ project }: { project: Project }) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>

      {/* HEADER — Avatar + Username */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", { uid: project.userId })}
        >
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.author}>User</Text>
          <Text style={styles.meta}>Tap to view profile</Text>
        </View>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{project.title}</Text>

      {/* DESCRIPTION */}
      <Text numberOfLines={3} style={styles.body}>
        {project.description}
      </Text>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="heart-outline" size={22} color="#fff" />
          <Text style={styles.likeText}>12</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("PostDetails", { project })}
        >
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F0F14",
    marginHorizontal: 14,
    marginVertical: 10,
    padding: 14,
    borderRadius: 12,
  },
  header: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 46, height: 46, borderRadius: 23, tintColor: "#888" },
  author: { color: "#fff", fontWeight: "700" },
  meta: { color: "#AAA", fontSize: 12 },
  title: { color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 12 },
  body: { color: "#CFCFCF", fontSize: 13, marginTop: 6 },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeText: { color: "#fff", marginLeft: 8 },
  viewText: { color: "#6C4EFF", fontWeight: "600" },
});

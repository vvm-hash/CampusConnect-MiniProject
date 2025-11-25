// screens/Search/SearchScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const navigation = useNavigation<any>();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"users" | "projects">("users");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      if (mode === "users") {
        const res = await firestore()
          .collection("users")
          .where("username", ">=", query)
          .where("username", "<=", query + "\uf8ff")
          .get();

        setUsers(res.docs.map((d) => ({ id: d.id, ...d.data() })));
        setProjects([]);
      } else {
        const res = await firestore()
          .collection("projects")
          .where("title", ">=", query)
          .where("title", "<=", query + "\uf8ff")
          .get();

        setProjects(res.docs.map((d) => ({ id: d.id, ...d.data() })));
        setUsers([]);
      }
    } catch (e) {
      console.log("Search error:", e);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* SEARCH BOX */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={22} color="#aaa" />

        <TextInput
          placeholder={`Search ${mode}...`}
          placeholderTextColor="#777"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* TOGGLE BUTTON */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          onPress={() => setMode("users")}
          style={[styles.toggleBtn, mode === "users" && styles.activeToggle]}
        >
          <Text style={styles.toggleText}>Users</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode("projects")}
          style={[styles.toggleBtn, mode === "projects" && styles.activeToggle]}
        >
          <Text style={styles.toggleText}>Projects</Text>
        </TouchableOpacity>
      </View>

      {/* RESULTS */}
      {loading ? (
        <Text style={styles.loading}>Searching...</Text>
      ) : (
        <>
          {/* USERS LIST */}
          {mode === "users" && (
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() =>
                query && (
                  <Text style={styles.emptyText}>No users found.</Text>
                )
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultCard}
                  onPress={() =>
                    navigation.navigate("UserProfile", {
                      userId: item.id,
                      author: { name: item.username, college: item.college },
                    })
                  }
                >
                  <Ionicons
                    name="person-circle-outline"
                    size={35}
                    color="#ccc"
                  />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.resultTitle}>{item.username}</Text>
                    <Text style={styles.resultSubtitle}>
                      {item.college ?? "GEC"}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          {/* PROJECTS LIST */}
          {mode === "projects" && (
            <FlatList
              data={projects}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() =>
                query && (
                  <Text style={styles.emptyText}>No projects found.</Text>
                )
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultCard}
                  onPress={() =>
                    navigation.navigate("PostDetails", { project: item })
                  }
                >
                  <Ionicons
                    name="folder-open-outline"
                    size={35}
                    color="#ccc"
                  />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <Text style={styles.resultSubtitle}>
                      {item.techStack || ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    paddingTop: 55,
    paddingBottom: 15,
    alignItems: "center",
    backgroundColor: "#111",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  searchRow: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    margin: 16,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
  },
  activeToggle: { backgroundColor: "#6C4EFF" },
  toggleText: { color: "white", fontWeight: "600" },

  loading: { textAlign: "center", color: "#aaa", marginTop: 20 },

  resultCard: {
    flexDirection: "row",
    padding: 14,
    marginHorizontal: 14,
    marginVertical: 6,
    backgroundColor: "#111",
    borderRadius: 10,
    alignItems: "center",
  },

  resultTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  resultSubtitle: {
    color: "#888",
    marginTop: 2,
  },

  emptyText: {
    color: "#666",
    textAlign: "center",
    marginTop: 30,
  },
});

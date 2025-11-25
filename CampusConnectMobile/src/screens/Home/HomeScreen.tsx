// screens/Home/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import PostCard from "./PostCard"; // make sure this file exists!

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("projects")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const list: any[] = [];
          snapshot.forEach((doc) =>
            list.push({ id: doc.id, ...doc.data() })
          );
          setProjects(list);
          setLoading(false);
        },
        (err) => {
          console.log(err);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Campus Connect</Text>

        <View style={{ width: 28 }} />
      </View>

      {/* FEED */}
      {loading ? (
        <Text style={styles.loading}>Loading projects…</Text>
      ) : projects.length === 0 ? (
        <Text style={styles.loading}>No projects yet.</Text>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard project={item} />}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    paddingTop: 55,
    paddingHorizontal: 18,
    paddingBottom: 15,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  loading: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

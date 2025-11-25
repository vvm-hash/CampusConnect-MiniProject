// screens/Post/ThreadsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ThreadsScreen() {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [popup, setPopup] = useState(false);
  const [newThreadText, setNewThreadText] = useState("");

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("threads")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setThreads(list);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const createThread = async () => {
    if (!newThreadText.trim()) return;

    const user = auth().currentUser;
    if (!user) return;

    // Fetch username from Firestore
    const snap = await firestore().collection("users").doc(user.uid).get();
    const username = snap.exists() ? snap.data()?.username : "User";

    await firestore().collection("threads").add({
      text: newThreadText,
      userId: user.uid,
      username: username,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    setNewThreadText("");
    setPopup(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Threads</Text>

        {/* ADD BUTTON */}
        <TouchableOpacity onPress={() => setPopup(true)}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#6C4EFF"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={threads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const avatarLetter = item.username
              ? item.username[0].toUpperCase()
              : "?";

            return (
              <View style={styles.card}>
                <View style={styles.row}>
                  {/* Avatar circle */}
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{avatarLetter}</Text>
                  </View>

                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* POPUP FOR CREATING THREAD */}
      <Modal visible={popup} transparent animationType="slide">
        <View style={styles.popupContainer}>
          <View style={styles.popupBox}>
            <Text style={styles.popupTitle}>Create Thread</Text>

            <TextInput
              placeholder="Write something..."
              placeholderTextColor="#777"
              style={styles.input}
              value={newThreadText}
              onChangeText={setNewThreadText}
              multiline
            />

            <View style={styles.popupButtons}>
              <TouchableOpacity onPress={() => setPopup(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={createThread}>
                <Text style={styles.postBtn}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#111",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },

  card: {
    backgroundColor: "#161616",
    marginHorizontal: 14,
    marginVertical: 8,
    padding: 14,
    borderRadius: 10,
  },

  row: { flexDirection: "row", alignItems: "center" },

  avatar: {
    width: 42,
    height: 42,
    backgroundColor: "#333",
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: { color: "#fff", fontSize: 18, fontWeight: "700" },

  username: { color: "#6C4EFF", fontWeight: "700", marginBottom: 4 },

  text: { color: "white", fontSize: 15 },

  /* POPUP */
  popupContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  popupBox: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 12,
  },
  popupTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  input: {
    backgroundColor: "#111",
    color: "white",
    marginTop: 15,
    padding: 14,
    borderRadius: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: { color: "#aaa", fontSize: 16 },
  postBtn: { color: "#6C4EFF", fontSize: 16, fontWeight: "700" },
});

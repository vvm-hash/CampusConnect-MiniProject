import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";

export default function ThreadDetailsScreen() {
  const { threadId } = useRoute<any>().params;
  const [thread, setThread] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsubThread = firestore()
      .collection("threads")
      .doc(threadId)
      .onSnapshot((doc) => setThread({ id: doc.id, ...doc.data() }));

    const unsubComments = firestore()
      .collection("threads")
      .doc(threadId)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      });

    return () => {
      unsubThread();
      unsubComments();
    };
  }, []);

  const addComment = async () => {
    if (!text.trim()) return;

    const user = auth().currentUser;

    await firestore()
      .collection("threads")
      .doc(threadId)
      .collection("comments")
      .add({
        text,
        userId: user?.uid,
        username: user?.email?.split("@")[0],
        likes: 0,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    setText("");
  };

  return (
    <View style={styles.container}>
      {thread && (
        <View style={styles.threadBox}>
          <Text style={styles.user}>@{thread.username}</Text>
          <Text style={styles.threadText}>{thread.text}</Text>
        </View>
      )}

      <FlatList
        data={comments}
        contentContainerStyle={{ paddingBottom: 90 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={styles.commentUser}>@{item.username}</Text>
            <Text style={styles.commentText}>{item.text}</Text>

            <View style={styles.row}>
              <Ionicons name="thumbs-up-outline" size={18} color="#aaa" />
              <Text style={styles.meta}>{item.likes}</Text>

              <TouchableOpacity>
                <Text style={[styles.meta, { marginLeft: 10 }]}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* COMMENT INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="#777"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={addComment}>
          <Ionicons name="send" size={26} color="#6C4EFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  threadBox: {
    backgroundColor: "#111",
    padding: 15,
    margin: 14,
    borderRadius: 10,
  },
  user: { color: "#6C8CFF", fontWeight: "700" },
  threadText: { color: "white", fontSize: 16, marginTop: 6 },

  commentCard: {
    backgroundColor: "#0F0F14",
    marginHorizontal: 14,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
  },
  commentUser: { color: "#6C8CFF", fontWeight: "600" },
  commentText: { color: "#fff", marginTop: 4 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  meta: { color: "#aaa", marginLeft: 4 },

  inputRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

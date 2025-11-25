// screens/Inbox/InboxScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { listenToThreads, Thread } from "../services/chatService";

export default function InboxScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const unsub = listenToThreads(user.uid, async (threadList) => {
      // Enrich threads with user data
      const enriched = await Promise.all(
        threadList.map(async (t) => {
          const otherUid = t.participants.find((x) => x !== user.uid);

          let otherUserData: any = null;
          if (otherUid) {
            const snap = await firestore()
              .collection("users")
              .doc(otherUid)
              .get();
            otherUserData = { uid: otherUid, ...(snap.data() || {}) };
          }

          return { ...t, otherUser: otherUserData };
        })
      );

      setThreads(enriched);
    });

    return unsub;
  }, []);

  const openChat = (thread: any) => {
    if (!thread.otherUser) return;

    navigation.navigate("ChatScreen", {
      threadId: thread.id,
      otherUser: {
        uid: thread.otherUser.uid,
        username: thread.otherUser.username,
      },
    });
  };

  const renderItem = ({ item }: any) => {
    if (!item.otherUser) return null;

    const letter = item.otherUser.username
      ?.charAt(0)
      ?.toUpperCase() ?? "U";

    return (
      <TouchableOpacity style={styles.row} onPress={() => openChat(item)}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarLetter}>{letter}</Text>
        </View>

        <View>
          <Text style={styles.username}>{item.otherUser.username}</Text>
          <Text style={styles.lastMsg} numberOfLines={1}>
            {item.lastMessage || "Say hi 👋"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inbox</Text>

      <FlatList data={threads} renderItem={renderItem} keyExtractor={(i) => i.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 50 },
  header: { color: "#fff", fontSize: 22, fontWeight: "700", marginLeft: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  avatarCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarLetter: { color: "#fff", fontSize: 20, fontWeight: "700" },
  username: { color: "#fff", fontSize: 16, fontWeight: "600" },
  lastMsg: { color: "#aaa", marginTop: 2, width: 200 },
});

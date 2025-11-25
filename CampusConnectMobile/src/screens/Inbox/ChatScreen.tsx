// screens/Inbox/ChatScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import {
  sendMessage,
  listenToMessages,
  Message,
} from "../services/chatService";

export default function ChatScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { threadId, otherUser } = route.params;
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const flatRef = useRef<any>(null);

  useEffect(() => {
    const unsub = listenToMessages(threadId, (list) => {
      setMessages(list);

      setTimeout(() => {
        flatRef.current?.scrollToEnd({ animated: true });
      }, 50);
    });

    return unsub;
  }, []);

  const send = () => {
    if (!text.trim()) return;
    sendMessage(threadId, text, user.uid);
    setText("");
  };

  const renderItem = ({ item }: any) => {
    const isMe = item.senderId === user.uid;

    return (
      <View
        style={[
          styles.msgBubble,
          isMe ? styles.meBubble : styles.themBubble,
        ]}
      >
        <Text style={styles.msgText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>{otherUser.username}</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 80 }}
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Message..."
          placeholderTextColor="#888"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={send}>
          <Ionicons name="send" size={24} color="#6C4EFF" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  // Updated header
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  backBtn: {
    position: "absolute",
    left: 15,
    top: 60,
    padding: 5,
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "700" },

  msgBubble: {
    maxWidth: "75%",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  meBubble: {
    backgroundColor: "#6C4EFF",
    alignSelf: "flex-end",
  },
  themBubble: {
    backgroundColor: "#333",
    alignSelf: "flex-start",
  },
  msgText: { color: "#fff" },

  inputBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 20,
    color: "#fff",
    paddingHorizontal: 15,
    marginRight: 8,
  },
});

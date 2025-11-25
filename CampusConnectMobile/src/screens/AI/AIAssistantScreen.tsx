import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { askGemini } from "../services/geminiService";
import { useNavigation } from "@react-navigation/native";

export default function AIAssistantScreen() {
  const navigation = useNavigation<any>();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const prompt = input;
    setInput("");
    setLoading(true);

    const reply = await askGemini(prompt);

    const botMessage = { role: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);

    setLoading(false);
  };

  return (
    <View style={styles.container}>

      {/* HEADER WITH BACK BUTTON */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.header}>Campus AI Assistant</Text>

        <View style={{ width: 26 }} /> {/* for spacing balance */}
      </View>

      <ScrollView style={styles.chatBox}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.msgBubble,
              msg.role === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.msgText}>{msg.text}</Text>
          </View>
        ))}

        {loading && (
          <Text style={styles.loadingText}>Thinking...</Text>
        )}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything..."
          placeholderTextColor="#777"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={28} color="#6C4EFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  headerContainer: {
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    padding: 4,
  },

  header: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginRight: 30, // keeps title centered visually
  },

  chatBox: { padding: 15 },

  msgBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: "80%",
  },

  userBubble: {
    backgroundColor: "#6C4EFF",
    alignSelf: "flex-end",
  },

  botBubble: {
    backgroundColor: "#222",
    alignSelf: "flex-start",
  },

  msgText: { color: "#fff", fontSize: 16 },

  loadingText: { color: "#aaa", marginTop: 5, fontStyle: "italic" },

  inputBar: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#111",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});

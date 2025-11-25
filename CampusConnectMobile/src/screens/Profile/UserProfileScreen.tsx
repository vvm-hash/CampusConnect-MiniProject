// screens/Profile/UserProfileScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { createOrGetThread } from "../services/chatService";

export default function UserProfileScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { uid, author } = route.params ?? {};
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!uid) {
          setLoading(false);
          return;
        }

        const snap = await firestore().collection("users").doc(uid).get();
        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (e) {
        console.log("Profile fetch error:", e);
      }
      setLoading(false);
    }

    fetchProfile();
  }, [uid]);

  const displayName =
    profile?.username ??
    author?.name ??
    `User ${uid?.substring(0, 6)}`;

  const displayCollege = profile?.college ?? author?.college ?? "Not specified";

  const avatarLetter = displayName?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 26 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6C4EFF" style={{ marginTop: 40 }} />
      ) : (
        <View style={styles.content}>

          {/* DYNAMIC AVATAR (FIRST LETTER) */}
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarLetter}>{avatarLetter}</Text>
          </View>

          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.college}>{displayCollege}</Text>

          {profile && (
            <>
              <Text style={styles.field}>Email: {profile.email}</Text>
              <Text style={styles.field}>Contact: {profile.contact}</Text>
              <Text style={styles.field}>GitHub: {profile.github}</Text>
              <Text style={styles.field}>LinkedIn: {profile.linkedin}</Text>
              <Text style={styles.field}>Year: {profile.year}</Text>
            </>
          )}

          {/* MESSAGE BUTTON */}
          <TouchableOpacity
            style={styles.msgBtn}
            onPress={async () => {
              const currentUid = auth().currentUser?.uid;

              if (!currentUid) {
                console.log("User not logged in");
                return;
              }

              const threadId = await createOrGetThread(currentUid, uid);

              navigation.navigate("ChatScreen", {
                threadId,
                otherUser: { uid, username: displayName },
              });
            }}
          >
            <Text style={styles.msgBtnText}>Message</Text>
          </TouchableOpacity>


        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    paddingTop: 60,
    paddingHorizontal: 18,
    paddingBottom: 12,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  content: { alignItems: "center", marginTop: 40 },

  /* NEW AVATAR CIRCLE */
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "700",
  },

  name: { color: "#fff", fontSize: 20, fontWeight: "700", marginTop: 12 },
  college: { color: "#aaa", marginTop: 6, marginBottom: 20 },
  field: { color: "#ccc", marginTop: 8, fontSize: 14 },

  /* MESSAGE BUTTON */
  msgBtn: {
    backgroundColor: "#6C4EFF",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
  },
  msgBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

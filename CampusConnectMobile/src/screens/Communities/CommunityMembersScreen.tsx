import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

type Member = {
  uid: string;
  username: string;
};

const DUMMY_MEMBERS: Member[] = [
  { uid: "u1", username: "Ved" },
  { uid: "u2", username: "Krisha" },
  { uid: "u3", username: "Aryan" },
];

export default function CommunityMembersScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { club } = route.params as { club: { id: string; name: string } };

  const renderItem = ({ item }: { item: Member }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        navigation.navigate("UserProfileScreen", {
          uid: item.uid,
        })
      }
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.username.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.name}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Members – {club.name}</Text>

        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={DUMMY_MEMBERS}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 18,
    paddingBottom: 12,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

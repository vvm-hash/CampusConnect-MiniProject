import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CommunityDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { club } = route.params as { club: { id: string; name: string } };

  const [isMember, setIsMember] = useState(false);

  const toggleMembership = () => {
    setIsMember((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{club.name}</Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.description}>
          Welcome to the {club.name}! This community is open to students from
          any college who share interest in this field.
        </Text>

        {/* Join / Leave button (local state for now) */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isMember ? "#333" : "#6C4EFF" },
          ]}
          onPress={toggleMembership}
        >
          <Text style={styles.buttonText}>
            {isMember ? "Leave Community" : "Join Community"}
          </Text>
        </TouchableOpacity>

        {/* View Members */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#222" }]}
          onPress={() =>
            navigation.navigate("CommunityMembers", {
              club,
            })
          }
        >
          <Text style={styles.buttonText}>View Members</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  description: { color: "#ccc", fontSize: 15, marginBottom: 20 },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

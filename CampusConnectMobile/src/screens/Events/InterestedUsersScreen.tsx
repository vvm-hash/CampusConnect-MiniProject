import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FAKE_USERS = [
  { uid: "1", username: "ved" },
  { uid: "2", username: "krisha" },
];

export default function InterestedUsersScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { competitionName } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View
        style={{
          paddingTop: 60,
          paddingBottom: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#222",
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", left: 15, top: 60 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          Interested in {competitionName}
        </Text>
      </View>

      <FlatList
        data={FAKE_USERS}
        keyExtractor={(i) => i.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#333",
            }}
            onPress={() =>
              navigation.navigate("UserProfile", {
                uid: item.uid,
              })
            }
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

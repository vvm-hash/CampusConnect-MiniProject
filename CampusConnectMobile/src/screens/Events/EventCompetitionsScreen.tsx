import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

const COMPETITIONS : Record<string, { id: string; name: string }[]> = {
  event1: [
    { id: "hack1", name: "Hackathon" },
    { id: "quiz1", name: "Quiz Competition" },
    { id: "robot1", name: "Robotics Challenge" },
  ],
  event2: [
    { id: "music1", name: "Battle of Bands" },
    { id: "dance1", name: "Dance Competition" },
  ],
  event3: [
    { id: "tech1", name: "Tech Expo" },
    { id: "startup1", name: "Startup Pitch" },
  ],
};

export default function EventCompetitionsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { eventId, eventTitle } = route.params;

  const competitions = COMPETITIONS[eventId] || [];

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header */}
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
          {eventTitle}
        </Text>
      </View>

      {/* Competition List */}
      <FlatList
        data={competitions}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#333",
            }}
            onPress={() =>
              navigation.navigate("CompetitionDetails", {
                competitionId: item.id,
                competitionName: item.name,
              })
            }
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

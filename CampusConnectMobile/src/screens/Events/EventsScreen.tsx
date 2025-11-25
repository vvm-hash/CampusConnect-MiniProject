import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const EVENTS = [
  {
    id: "event1",
    title: "Inception 2025",
    college: "NIT Goa",
  },
  {
    id: "event2",
    title: "Waves 2025",
    college: "BITS Pilani Goa",
  },
  {
    id: "event3",
    title: "Quark 2025",
    college: "BITS Pilani",
  },
];

export default function EventsScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header */}
      <View
        style={{
          paddingTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 15,
          backgroundColor: "#111",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
          Events
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* Events List */}
      <FlatList
        data={EVENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#333",
            }}
            onPress={() =>
              navigation.navigate("EventCompetitions", {
                eventId: item.id,
                eventTitle: item.title,
                college: item.college,
              })
            }
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              {item.title}
            </Text>
            <Text style={{ color: "#aaa", marginTop: 4 }}>{item.college}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

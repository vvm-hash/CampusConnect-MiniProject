import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function CommunitiesScreen() {
  const navigation = useNavigation<any>();

  const clubs = [
    { id: "coding", name: "Coding Club" },
    { id: "robotics", name: "Robotics Club" },
    { id: "photography", name: "Photography Club" },
    { id: "ai", name: "AI / Machine Learning Club" },
    { id: "cyber", name: "Cybersecurity Club" },
    { id: "gaming", name: "Gaming Club" },
    { id: "music", name: "Music Club" },
    { id: "dance", name: "Dance Club" },
    { id: "startup", name: "Startup & Entrepreneurship Club" },
  ];

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
          Communities
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* List */}
      <ScrollView style={{ marginTop: 20 }}>
        {clubs.map((club) => (
          <TouchableOpacity
            key={club.id}
            style={{
              padding: 18,
              marginHorizontal: 16,
              marginVertical: 8,
              backgroundColor: "#111",
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate(
                "CommunityDetails" as never,
                { club } as never
              )
            }
          >
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
              {club.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

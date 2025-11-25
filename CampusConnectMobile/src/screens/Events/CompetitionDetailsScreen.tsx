import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export default function CompetitionDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { competitionId, competitionName } = route.params;

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
          {competitionName}
        </Text>
      </View>

      {/* Dummy Details */}
      <Text style={{ color: "#fff", margin: 20, fontSize: 16 }}>
        Event Description goes here...
      </Text>

      {/* I'm Interested Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#6C4EFF",
          padding: 15,
          marginHorizontal: 20,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={() => Alert.alert("Marked as Interested", "You will appear under Interested People.")}
      >
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
          I'm Interested
        </Text>
      </TouchableOpacity>

      {/* Interested People */}
      <TouchableOpacity
        style={{
          backgroundColor: "#333",
          padding: 15,
          marginHorizontal: 20,
          borderRadius: 10,
          marginTop: 15,
        }}
        onPress={() =>
          navigation.navigate("InterestedUsers", {
            competitionId,
            competitionName,
          })
        }
      >
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
          Interested People
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function EventsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
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
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>Academics</Text>

        <View style={{ width: 28 }} />
      </View>

      <Text style={{ color: "#fff", marginTop: 50, textAlign: "center" }}>Academics Screen</Text>
    </View>
  );
}

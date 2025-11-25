import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CommunitiesScreen from "../screens/Communities/CommunitiesScreen";
import CommunityDetailsScreen from "../screens/Communities/CommunityDetailsScreen.tsx";
import CommunityMembersScreen from "../screens/Communities/CommunityMembersScreen.tsx";

const Stack = createNativeStackNavigator();

export default function CommunitiesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunitiesMain" component={CommunitiesScreen} />
      <Stack.Screen name="CommunityDetails" component={CommunityDetailsScreen} />
      <Stack.Screen name="CommunityMembers" component={CommunityMembersScreen} />
    </Stack.Navigator>
  );
}

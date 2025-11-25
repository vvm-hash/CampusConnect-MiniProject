import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EventsScreen from "./EventsScreen";
import EventCompetitionsScreen from "./EventCompetitionsScreen";
import CompetitionDetailsScreen from "./CompetitionDetailsScreen";
import InterestedUsersScreen from "./InterestedUsersScreen";

const Stack = createNativeStackNavigator();

export default function EventsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventsHome" component={EventsScreen} />
      <Stack.Screen name="EventCompetitions" component={EventCompetitionsScreen} />
      <Stack.Screen name="CompetitionDetails" component={CompetitionDetailsScreen} />
      <Stack.Screen name="InterestedUsers" component={InterestedUsersScreen} />
    </Stack.Navigator>
  );
}

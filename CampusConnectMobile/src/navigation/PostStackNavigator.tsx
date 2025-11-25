import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostScreen from "../screens/Post/PostScreen";
import CreateProjectScreen from "../screens/Post/CreateProjectScreen";
import PostDetailsScreen from "../screens/Post/PostDetailsScreen";   // optional
import ThreadsScreen from "../screens/Post/ThreadsScreen";            // create later
import ThreadDetailsScreen from "../screens/Post/ThreadDetailsScreen";            // create later

const Stack = createNativeStackNavigator();

export default function PostStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostMain" component={PostScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen name="Threads" component={ThreadsScreen} />
      <Stack.Screen name="ThreadDetails" component={ThreadDetailsScreen} />
    </Stack.Navigator>
  );
}

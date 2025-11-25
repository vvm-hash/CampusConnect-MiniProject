import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import PostDetailsScreen from "../Post/PostDetailsScreen";
import UserProfileScreen from "../Profile/UserProfileScreen";
import CreateProjectScreen from "../Post/CreateProjectScreen";


const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeFeed" component={HomeScreen} />

      {/* Screens opened from PostCard */}
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
    </Stack.Navigator>
  );
}

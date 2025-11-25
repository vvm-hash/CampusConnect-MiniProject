// navigation/TabNavigator.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNavigator from "./DrawerNavigator";  // ✔ keep this
import SearchScreen from "../screens/Search/SearchScreen";
import PostStackNavigator from "./PostStackNavigator";

import InboxScreen from "../screens/Inbox/InboxScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#fff",
      }}
    >
      {/* HOME uses Drawer -> Drawer loads HomeStackNavigator */}
      <Tab.Screen name="Home" component={DrawerNavigator} />

      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Post" component={PostStackNavigator} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

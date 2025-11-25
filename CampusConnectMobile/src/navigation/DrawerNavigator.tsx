import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "../screens/Home/HomeStackNavigator";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import EventsStackNavigator from "../screens/Events/EventsStackNavigator";
import CommunitiesStackNavigator from "../navigation/CommunitiesStackNavigator";
import AcademicsScreen from "../screens/Academics/AcademicsScreen";
import AIAssistantScreen from "../screens/AI/AIAssistantScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#121212", width: 260 },
        drawerActiveTintColor: "#6C4EFF",
        drawerInactiveTintColor: "white",
      }}
    >

      {/* ⭐ USE STACK HERE, NOT HomeScreen */}
      <Drawer.Screen
        name="HomeMain"
        component={HomeStackNavigator}
        options={{ title: "Home" }}
      />

      <Drawer.Screen name="Events" component={EventsStackNavigator} />
      <Drawer.Screen name="Communities" component={CommunitiesStackNavigator} />
      <Drawer.Screen name="Academics" component={AcademicsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="AI Assistant" component={AIAssistantScreen} />
    </Drawer.Navigator>
  );
}

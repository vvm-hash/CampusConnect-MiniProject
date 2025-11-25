import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import DrawerNavigator from "./DrawerNavigator";
import HomeTabs from "./TabNavigator";

// ⭐ ADD THIS IMPORT
import ChatScreen from "../screens/Inbox/ChatScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profileCompleted, setProfileCompleted] = useState(false);

  // AUTH LISTENER
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(u => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  // PROFILE CHECK
  useEffect(() => {
    if (!user) return;

    const sub = firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(doc => {
        setProfileCompleted(doc.data()?.profileCompleted ?? false);
      });

    return () => sub();
  }, [user]);

  // SCREENS
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!profileCompleted ? (
        <Stack.Screen name="ProfileSetup" component={ProfileScreen} />
      ) : (
        <>
          {/* Your main app */}
          <Stack.Screen name="MainApp" component={HomeTabs} />

          {/* ⭐ NEW — ChatScreen registered in the same navigator */}
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email.trim(), password);
      console.log("User registered!");
      navigation.navigate("Login");
    } catch (error: any) {
      console.log("SIGNUP ERROR:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", paddingHorizontal: 26 }}>
      <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 35 }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={{ borderWidth: 1, borderColor: "#333", padding: 14, borderRadius: 10, color: "#fff", marginBottom: 16 }}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        style={{ borderWidth: 1, borderColor: "#333", padding: 14, borderRadius: 10, color: "#fff" }}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleSignup} style={{ backgroundColor: "#1DA1F2", padding: 14, borderRadius: 10, marginTop: 20 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#aaa", textAlign: "center", marginTop: 22 }}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}

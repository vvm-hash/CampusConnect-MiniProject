import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";







export default function ProfileScreen() {
    const user = auth().currentUser;

    if (!user) {
        return null;
    }

    const uid = user.uid;

    const [username, setUsername] = useState("");
    const [college, setCollege] = useState("");
    const [year, setYear] = useState("");
    const [contact, setContact] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [loading, setLoading] = useState(true);
    const [photoUrl, setPhotoUrl] = useState("");
    const navigation = useNavigation();


    const handleImagePick = async () => {
        launchImageLibrary(
            { mediaType: "photo", quality: 0.7 },
            async (response) => {
                if (response.didCancel) return;
                if (response.errorCode) return Alert.alert("Error", response.errorMessage);

                const asset = response.assets?.[0];
                if (!asset?.uri) return;

                setPhotoUrl(asset.uri); // temporary preview
            }
        );
    };




    // Fetch user profile from Firestore
    useEffect(() => {
        if (!uid) return;
        const unsubscribe = firestore()
            .collection("users")
            .doc(uid)
            .onSnapshot((doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setUsername(data?.username || "");
                    setCollege(data?.college || "");
                    setYear(data?.year || "");
                    setContact(data?.contact || "");
                    setGithub(data?.github || "");
                    setLinkedin(data?.linkedin || "");
                }
                setLoading(false);
            });

        return () => unsubscribe();
    }, [uid]);

    const handleSave = async () => {
        await firestore().collection("users").doc(uid).set(
            {
                username,
                college,
                year,
                contact,
                github,
                linkedin,
                email: user.email,
                profileCompleted: true,
            },
            { merge: true }
        );

        Alert.alert("Saved", "Profile updated successfully");

        navigation.navigate("Home" as never);


    };



    if (!user) return null;

    return (
        <ScrollView style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={handleImagePick}>
                    <Image
                        source={photoUrl ? { uri: photoUrl } : require("../../assets/avatar.png")}
                        style={styles.avatar}
                    />
                </TouchableOpacity>

                <Text style={styles.usernameText}>{username || "Your Username"}</Text>
                <Text style={styles.emailText}>{user.email}</Text>
            </View>


            {/* Form */}
            <View style={styles.form}>
                <ProfileInput label="Username" value={username} onChange={setUsername} />
                <ProfileInput label="College" value={college} onChange={setCollege} />
                <View style={{ marginBottom: 18 }}>
                    <Text style={styles.label}>Year</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={[
                            { label: "FE", value: "FE" },
                            { label: "SE", value: "SE" },
                            { label: "TE", value: "TE" },
                            { label: "BE", value: "BE" },
                        ]}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Year"
                        placeholderStyle={{ color: "#777" }}
                        selectedTextStyle={{ color: "white" }}
                        value={year}
                        onChange={(item) => setYear(item.value)}
                    />
                </View>


                <ProfileInput label="Contact Number" value={contact} onChange={setContact} />
                <ProfileInput label="GitHub Link" value={github} onChange={setGithub} />
                <ProfileInput label="LinkedIn Link" value={linkedin} onChange={setLinkedin} />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function ProfileInput({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <View style={{ marginBottom: 18 }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={label}
                placeholderTextColor="#777"
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A1A2E",
        paddingHorizontal: 20,
    },
    avatarContainer: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 20,
    },
    avatar: {
        width: 95,
        height: 95,
        borderRadius: 50,
        tintColor: "#777",
    },
    usernameText: {
        fontSize: 20,
        color: "white",
        marginTop: 8,
        fontWeight: "600",
    },
    emailText: {
        fontSize: 14,
        color: "#aaa",
    },
    form: {
        marginTop: 30,
    },
    label: {
        color: "#B8B8FF",
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#2A2A45",
        padding: 12,
        borderRadius: 8,
        color: "white",
    },
    saveBtn: {
        backgroundColor: "#6C4EFF",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginVertical: 40,
    },
    saveText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    pickerContainer: {
        backgroundColor: "#2A2A45",
        borderRadius: 8,
    },
    dropdown: {
        backgroundColor: "#2A2A45",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: "white",
    },


});

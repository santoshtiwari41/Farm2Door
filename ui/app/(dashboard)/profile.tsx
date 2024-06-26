import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "@/api";
import FarmerProfile from "@/components/FarmerProfile";
import { useAuth } from "@/context/useAuth";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const { deleteToken } = useAuth();
  const getFarmer = async () => {
    try {
      const res = await api.get("/farmers/profile");
      return res.data;
    } catch (error) {
      console.log("Error while fetching products", error);
    }
  };
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getFarmer,
  });

  if (isLoading || isError) {
    return <Text>Loading...</Text>;
  }
  // console.log(profile);

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <FarmerProfile farmer={profile.farmer} />
      <TouchableOpacity
        onPress={() => {
          deleteToken();
          router.push("/(auth)/signin");
        }}
        style={styles.signOut}
      >
        <MaterialIcons name="logout" size={24} color="#ff6347" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  signOut: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  signOutText: {
    marginLeft: 8,
    color: "#ff6347",
    fontWeight: "bold",
  },
});

import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, ScrollView, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/useAuth";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

const Profile = () => {
  const { deleteToken } = useAuth();

  // Dummy data for styling purposes
  const dummyProfileData = {
    avatar: "https://example.com/avatar.jpg",
    name: "Nabin Dhami",
    email: "navinDhami@gmail.com",
  };

  const dummyOrders = [
    { id: 1, product: "Papaya", price: "$50.00", date: "2022-01-15" },
    { id: 2, product: "mango", price: "$30.00", date: "2022-01-14" },
    { id: 3, product: "raddish", price: "$20.00", date: "2022-01-13" },
    // Add more orders as needed
  ];

  const getProfile = async () => {
    try {

      console.log("Fetching profile data...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Profile data fetched successfully.");

      return { ...dummyProfileData, orders: dummyOrders };
    } catch (error) {
      console.log("Error while fetching profile", error);
    }
  };

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading profile data</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>

    

      <Image source={require('../../assets/images/alien.jpg')} style={styles.profileImage} />
      <Text style={styles.title}>{profile.name}</Text>
      <Text style={styles.subtitle}>{profile.email}</Text>

      <ScrollView style={styles.ordersContainer}>
        <Text style={styles.ordersTitle}>Order History</Text>
        {profile.orders && profile.orders.map(order => (
          <View key={order.id} style={styles.orderItem}>
            <Text>{order.product}</Text>
            <Text>{order.price}</Text>
            <Text>{order.date}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => {
          deleteToken();
          router.push("/(auth)/signin");
        }}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      <Pressable style={{ backgroundColor: '#ddddd', marginTop: 50, height: 50, width: 350,height:60, alignItems: 'center', borderRadius: 10 }}>
        <Text style={{textAlign:'center',justifyContent:'center',marginTop:12,fontWeight:'bold',fontSize:16}}>settings</Text>

        </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    // backgroundColor: "#ffffff",
    // Light background color
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: "#FFF", // White border around the image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,

  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,

  },
  ordersContainer: {
    marginTop: 20,
    width: "100%",
  },
  ordersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Avenir-Medium",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  signOutButton: {
    backgroundColor: "#8b2ff5",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 400,
      height: 40,

    },
    shadowOpacity: 0.3,
    width: 350,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  signOutText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;

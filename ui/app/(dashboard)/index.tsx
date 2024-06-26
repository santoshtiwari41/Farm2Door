import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home: React.FC = () => {
  const features = [
    { name: "Loans", icon: "cash", color: "#2ecc71" },
    { name: "Insurance", icon: "umbrella", color: "#e74c3c" },
    { name: "Seeds", icon: "seed", color: "#3498db" },
    { name: "Fertilizers", icon: "flask", color: "#f39c12" },
    { name: "Transportation", icon: "truck", color: "#9b59b6" },
    { name: "Machinery", icon: "toolbox", color: "#34495e" },
    { name: "Weather", icon: "weather-cloudy", color: "#f39c12" },
    { name: "Market", icon: "store", color: "#3498db" },
    { name: "Healthcare", icon: "hospital", color: "#e74c3c" },
  ];

  const renderFeatureButtons = () => {
    return features.map((feature, index) => (
      <TouchableOpacity key={index} style={styles.button}>
        <MaterialCommunityIcons
          // @ts-ignore
          name={feature.icon}
          size={50}
          color={feature.color}
        />
        <Text style={styles.buttonText}>{feature.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://psmag.com/.image/t_share/MTU5MjYxMzcxNzIzMTYyODM4/gettyimages-53164502.jpg",
        }} // Update with your image path
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.buttonContainer}>{renderFeatureButtons()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: "#ecf0f1",
  },
  image: {
    width: "100%",
    height: 200, // Adjust the height as needed
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 200,
  },
  button: {
    alignItems: "center",
    width: "30%",
    marginBottom: 20,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Home;

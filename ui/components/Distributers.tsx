import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, Text, View } from "react-native";

import api from "@/api";
import { Ionicons } from "@expo/vector-icons";

const Distributers = () => {
  const getDistributers = async () => {
    try {
      const res = await api.get("/distributers");
      return res.data;
    } catch (error) {
      console.log("Error while fetching distributers", error);
    }
  };

  const {
    data: distributers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["distributers"],
    queryFn: getDistributers,
  });

  if (isLoading || isError) {
    return <Text>Loading...</Text>;
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Ionicons name="cart" size={30} color="#8b2ff5"/>
      <Text style={{ fontSize: 20 }}>{item.name}</Text>
      <Text style={{ opacity: 0.5 }}>{item.location.coordinates}</Text>
    </View>
  );

  return (
    <FlatList
      data={distributers}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      vertical
    />
  );
};

export default Distributers;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
});

import { useAuth } from "@/context/useAuth";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Role = () => {
  const { type, setType } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType("farmer");
            router.push("/(farmer)/register");
          }}
        >
          <Text style={styles.type}>Farmer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType("customer");
            router.push("/(farmer)/register");
          }}
        >
          <Text style={styles.type}>Customer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    width: 180,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
  type: {
    color: "white",
  },
});

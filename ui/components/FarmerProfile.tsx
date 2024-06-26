import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FarmerData {
  farmer: {
    _id: string;
    name: string;
    phone: number;
    gender: string;
    address: string;
    createdAt: string;
  };
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString(undefined, {
    hour: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

const FarmerProfile: React.FC<FarmerData> = ({ farmer }) => {
  const { name, address, createdAt, gender, phone } = farmer;

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}>{formatDate(createdAt)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    flex: 2,
  },
});

export default FarmerProfile;

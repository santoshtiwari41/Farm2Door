import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SettingsProps {
  onSignOut: () => void;
}

const settingsData = [
  { label: "Account Settings", icon: "gear" },
  { label: "Notifications", icon: "bell" },
  { label: "Change Password", icon: "lock" },
  { label: "Privacy Settings", icon: "user-secret" },
  { label: "Language", icon: "language" },
  { label: "Theme", icon: "paint-brush" },
  { label: "Help & Support", icon: "question-circle" },
  { label: "About", icon: "info-circle" },
  { label: "Terms and Conditions", icon: "file-text" },
  { label: "Advanced Settings", icon: "cogs" },
];

const SettingsPage: React.FC<SettingsProps> = ({ onSignOut }) => {
  return (
    <View style={styles.container}>
      {settingsData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => console.log(`Navigate to ${item.label}`)}
        >
          <FontAwesome
            // @ts-ignore
            name={item.icon}
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
      <View style={{ marginTop: 10 }} />
      <TouchableOpacity style={styles.item} onPress={onSignOut}>
        <FontAwesome
          name="sign-out"
          size={24}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.label}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 40,
    borderRadius: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  icon: {
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
});

export default SettingsPage;

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

const InputComponent = ({
  placeholder,
  value,
  onChangeText,
  iconName,
}: any) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={22} color="#555555" style={styles.icon} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999999"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    width: 370,
    height: 48,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 8,
    color: "black",
    fontSize: 14.5,
  },
  icon: {
    padding: 13,
  },
});
export default InputComponent;

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const PasswordInput = ({
  placeholder,
  onChangeText,
  value,
  iconName,
  onPress,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={22} color="#555555" style={styles.icon} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999999"
        />
      </View>
      <TouchableOpacity onPress={toggleShowPassword} style={styles.eye}>
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={22}
          color="#555555"
        />
      </TouchableOpacity>
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
  eye: {
    padding: 12,
  },
});
export default PasswordInput;

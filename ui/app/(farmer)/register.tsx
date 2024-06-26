import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import api from "@/api";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/useAuth";
import { router } from "expo-router";
import MobileScreen from "../../assets/images/MobileScreen";

const RegisterNumber = () => {
  const { setUser } = useAuth();

  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  const handleInputChange = (input: any) => {
    const formattedInput = input.replace(/[^0-9]/g, "");
    setPhone(formattedInput);
  };

  const handlePress = async () => {
    if (phone.length !== 10) {
      return setError("Invalid Number");
    }

    try {
      const res = await api.post("/farmers/register", { phone });
      setUser({ _id: res.data.farmer._id });
      router.push("/(farmer)/otp");
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setPhone("");
      setError("");
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? -50 : -600}
    >
      <View style={{ marginLeft: 70, marginTop: 100 }}>
        <MobileScreen />
      </View>
      <View>
        <Text>Farmer Screen</Text>
      </View>
      <View style={styles.input}>
        <Text style={styles.countryCode}>+977</Text>
        <TextInput
          placeholder=""
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handleInputChange}
          style={styles.textinput}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          router.push("/(farmer)/signin");
        }}
      >
        <Text>Let's Sign in</Text>
      </TouchableOpacity>

      {error && (
        <Text style={{ color: "red", marginBottom: 10, marginLeft: 50 }}>
          {error}
        </Text>
      )}

      <View>
        <CustomButton title="GET OTP" onPress={handlePress} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterNumber;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    // justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 7,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 100,
    zIndex: 1,
    color: "#000",
    width: 351,
    marginTop: 70,
  },
  textinput: {
    height: 40,
    marginRight: 25,
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  countryCode: {
    height: 40,
    padding: 8.5,
    paddingLeft: 5,
    fontSize: 16,
  },
});

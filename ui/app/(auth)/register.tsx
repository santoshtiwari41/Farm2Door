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
      const res = await api.post("/customers/register", { phone });
      setUser({ _id: res.data.customer._id });
      router.push("/(auth)/otp");
    } catch (error: any) {
      console.error(error.response.data.error, "error");
      setError(error.response.data.error);
    } finally {
      setPhone("");
      setError("");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -50 : -300}
    >
      <View style={{ marginLeft: 70, marginTop: 100 }}>
        <MobileScreen />
      </View>
      <View></View>
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

      {error && (
        <Text style={{ color: "red", marginBottom: 10, marginLeft: 50 }}>
          {error}
        </Text>
      )}
      <View>
        <CustomButton title="GET OTP" onPress={handlePress} />
      </View>

      <View style={styles.signUp}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/signin");
          }}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUp}>
        <Text style={styles.accountText}>Select Role</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/role");
          }}
        >
          <Text style={styles.signUpText}>Select Rolee</Text>
        </TouchableOpacity>
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
    height: 60,
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
  signUpText: {
    color: "black",
    fontSize: 16,
    paddingLeft: 16,
  },
  accountText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16,
  },
  signUp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 50,
  },
});

import api from "@/api";
import CustomButton from "@/components/CustomButton";
import InputComponent from "@/components/InputComponent";
import PasswordInput from "@/components/PasswordInput";
import { useAuth } from "@/context/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginImage from "../../assets/images/LoginImages";

const Signin = () => {
  const { user, setToken, setUser } = useAuth();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [notName, setNotName] = useState(false);

  const handleSignIn = async () => {
    try {
      const res = await api.post(`farmers/signin`, {
        phone,
        password,
      });
      setToken(res.data.accessToken);
      setUser({
        _id: res.data.farmer._id,
        name: res.data.farmer.name,
        phone: res.data.farmer.phone,
      });
      router.push("/(tabs)/");
    } catch (error: any) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  const handleSignup = () => {
    router.push("/(farmer)/signup");
  };
  return (
    <View style={styles.container}>
      <LoginImage />
      <Text style={styles.title}>Welcome to Farm to door</Text>

      <InputComponent
        placeholder="Enter phone number"
        iconName="key"
        value={phone}
        onChangeText={setPhone}
      />

      <PasswordInput
        placeholder="Enter your password"
        iconName="key"
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
      />
      {notName && (
        <Text style={{ marginTop: -10, marginBottom: 10 }}>
          invalid phone or password
        </Text>
      )}

      <CustomButton title="login" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "white",
    zIndex: 1,
  },
  title: {
    fontSize: 24,

    marginBottom: 32,

    marginTop: 15,
  },
  formContainer: {
    width: "100%",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 370,
    marginBottom: 16,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    color: "black",
    marginLeft: 8,
    fontSize: 14.5,
  },
  forgotPasswordButtonText: {
    color: "#8b2ff5",
    textDecorationLine: "underline",
    fontSize: 14.5,
  },

  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUp: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    paddingLeft: 16,
    color: "#8b2ff5",
  },
  accountText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16,
  },
});

export default Signin;

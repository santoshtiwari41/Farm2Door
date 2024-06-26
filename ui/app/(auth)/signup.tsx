import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import api from "@/api";
import CustomButton from "@/components/CustomButton";
import InputComponent from "@/components/InputComponent";
import PasswordInput from "@/components/PasswordInput";
import { useAuth } from "@/context/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

const Signup = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState("");
  const options = ["male", "female"];
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
 

  const handleSignUp = async () => {
    try {
      const res = await api.post(`/customers/${user?._id}/signup`, {
        name,
        gender: selected,
        address,
        password,
      });

      console.log(res.data, "ojiji");
      router.push("/(auth)/signin");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.error);
    }
  };
  const handleLogin=()=>{
    router.push("/(auth)/signin");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <Ionicons name="arrow-back" size={27} color="#444444" />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to Farm to door</Text>

      <InputComponent
        placeholder="Enter full name"
        iconName="person"
        value={name}
        onChangeText={setName}
      />
      <InputComponent
        placeholder="Enter address"
        iconName="navigate"
        value={address}
        onChangeText={setAddress}
      />
      <PasswordInput
        placeholder="Enter new password"
        iconName="key"
        value={password}
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
      />

      <View style={styles.questionContainer}>
        <Text style={{ marginRight: 40, marginLeft: -50, fontSize: 16 }}>
          Gender
        </Text>
        <View style={styles.optionsContainer}>
          {options.map((option) => {
            return (
              <TouchableOpacity
                key={option}
                style={styles.singleOptionContainer}
                onPress={() => setSelected(option)}
              >
                <View style={styles.outerCircle}>
                  {selected === option ? (
                    <View style={styles.innerCircle} />
                  ) : null}
                </View>
                <Text style={{ fontSize: 16 }}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

    
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <CustomButton title="Sign up" onPress={handleSignUp} />

      <View style={styles.signUp}>
        <Text style={styles.accountText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
    zIndex: 1,
  },
  title: {
    fontSize: 24,

    marginBottom: 32,

    marginTop: 55,
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
 
 

  
  
  signUp: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  signUpText: {
    color: "#8b2ff5",
    fontSize: 16,
    paddingLeft: 16,
  },
  accountText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 16,
  },
  header: {
    marginLeft: -320,
    marginTop: -200,
    
  },

  questionContainer: {
    flexDirection: "row", // Update to flexDirection: 'row'
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: -30,
    marginBottom: 5,
    marginLeft: 45,
  },
  optionsContainer: {
    flexDirection: "row", // Added for aligning options horizontally
    marginLeft: 10, // Added for spacing between options
  },
  singleOptionContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
  },
  outerCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#B508F1",
  },
});

export default Signup;

// @ts-nocheck

import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "@/api";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";

const OtpScreen = () => {
  const { user } = useAuth();

  const [error, setError] = useState("");

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();

  const [otpp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const [allOtp, setAllotp] = useState(false);

  const otp = Object.values(otpp).join("");
  const handleOtp = async () => {
    try {
      const res = await api.post(`/customers/${user?._id}/verify`, { otp });

      router.push("/(auth)/signup");
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={30} />
      </View>
      <View style={styles.svg}>{/* <OtpImage /> */}</View>
      <Text style={styles.content}>Enter the OTP number just sent you</Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={(text) => {
              setOtp({ ...otpp, 1: text });
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={(text) => {
              setOtp({ ...otpp, 2: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={(text) => {
              setOtp({ ...otpp, 3: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={(text) => {
              setOtp({ ...otpp, 4: text });
              text ? fifthInput.current.focus() : thirdInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fifthInput}
            onChangeText={(text) => {
              setOtp({ ...otpp, 5: text });
              text ? sixthInput.current.focus() : fourthInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={sixthInput}
            onChangeText={(text) => {
              setOtp({ ...otpp, 6: text });
              !text && fifthInput.current.focus();
            }}
          />
        </View>
      </View>
      {allOtp && (
        <Text style={{ textAlign: "center", marginLeft: -50 }}>
          Please enter all otp
        </Text>
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <CustomButton title="Verify" onPress={handleOtp} disabled={!otp} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor: "#8b2ff5",
    borderRadius: 8,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 45,
    color: "white",
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: "white",
    fontWeight: "bold",
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: -170,
    marginLeft: 10,
  },
  svg: {
    alignItems: "center",
    marginBottom: 50,
  },
});

export default OtpScreen;

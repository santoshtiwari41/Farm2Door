import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

import { useAuth } from "@/context/useAuth";

const AuthLayout = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (token) {
    return <Redirect href="/(tabs)/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="register">
      <Stack.Screen name="register" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="otp" />
    </Stack>
  );
};

export default AuthLayout;

import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

import { useAuth } from "@/context/useAuth";

const AuthLayout = () => {
  const { token, loading, type } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (token && type === "customer") {
    return <Redirect href="/(tabs)/" />;
  } else if (token && type === "farmer") {
    return <Redirect href="/(dashboard)/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="role">
      <Stack.Screen name="role" />
      <Stack.Screen name="register" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="otp" />
    </Stack>
  );
};

export default AuthLayout;

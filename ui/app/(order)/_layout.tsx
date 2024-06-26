import { Stack } from "expo-router";

const OrderLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="confirm" />
      <Stack.Screen name="orders" />
    </Stack>
  );
};

export default OrderLayout;

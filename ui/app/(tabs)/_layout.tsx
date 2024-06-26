import Colors from "@/constants/Colors";
import { useAuth } from "@/context/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

const RootLayout = () => {
  const { token, user, type } = useAuth();

  if (!token) {
    if (!user) {
      return <Redirect href="/(auth)/register" />;
    } else {
      return <Redirect href="/(auth)/signin" />;
    }
  }

  if (token && type === "farmer") {
    return <Redirect href="/(dashboard)/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

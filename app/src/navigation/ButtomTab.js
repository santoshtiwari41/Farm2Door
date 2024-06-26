import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
import React from 'react'
import { Cart, Explore, Home, Profile } from '../screens';

const ButtomTab = () => {
    return (
            <Tab.Navigator screenOptions={({ route }) => ({
                 tabBarActiveTintColor: '#8b2ff5',
               
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
                <Tab.Screen name="Home" component={Home}
                    options={{headerShown:false}}
                />
                <Tab.Screen name="Explore" component={Explore} 
                options={{headerShown:false}}
                />
                <Tab.Screen name="Cart" component={Cart} 
                options={{headerShown:false}}
                />
                <Tab.Screen name="Profile" component={Profile} 
                options={{headerShown:false}}
                />
            </Tab.Navigator>
    )
}


export default ButtomTab
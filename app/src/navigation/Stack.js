import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ButtomTab from './ButtomTab';
import {Cart,Explore,Home,Onboarding,Otp,Profile,Product,Signin,Signup} from "../screens"
import ConfirmScreen from '../screens/ConfirmScreen';
import OrderScreen from '../screens/OrderScreen';
import Role from '../screens/auth/Role';
import ForgotPassword from '../screens/auth/ForgotPassword';


const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="OnboardingScreen" component={Onboarding} options={{ headerShown: false }} />
                <Stack.Screen name="OtpScreen" component={Otp} options={{ headerShown: false }} />
                <Stack.Screen name="ProductInfo" component={Product} options={{ headerShown: false }} />
                <Stack.Screen name="ButtomTab" component={ButtomTab} options={{ headerShown: false }} />
                <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
                <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation
import { View, Text, StyleSheet, } from 'react-native';
import React, { useEffect } from 'react';

import LottieView from 'lottie-react-native';
import { router } from 'expo-router';

const OrderScreen = () => {


    useEffect(() => {

        const timeoutId = setTimeout(() => {
            router.push('/(tabs)')

        }, 2000);


        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 60 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24, lineHeight: 40, color: '#8b2ff5' }}>congratulation, your order placed succesfully.</Text>
            </View>

            <LottieView source={require('../../assets/images/Splash.json')}
                autoPlay
                loop={false}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'space-betweeen',
    }
})

export default OrderScreen;
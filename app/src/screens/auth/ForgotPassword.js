import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ForgotPasswordImage from '../../assets/images/ForgotPasswordImage';
import InputComponent from '../../components/InputComponent';

const ForgotPassword = ({ navigation }) => {
    const [Email, setEmail] = useState('');
    
    const handleForgotPassword = () => {
        
        console.warn("apply logic for forgot password")
    };
    const handleLogIn = () => {
        navigation.navigate('LogIn');
    };

    return (
        <View style={styles.container}>
             
            <View style={styles.img}>
            <TouchableOpacity
                style={styles.header}
                onPress={handleLogIn}
            >
                <Ionicons name="arrow-back" size={27} color="#999999" />
            </TouchableOpacity>
            <ForgotPasswordImage />
            </View>
            <Text style={styles.title}>Reset your password</Text>
            <InputComponent placeholder="enter email" icon name="email"/>
               
               
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#000000',
        zIndex: 1,
    },
    header:{
        marginLeft:-90,
        marginTop:-85,
        marginBottom:60
    },
    img:{
        marginTop:-20,
        marginBottom:20
    },
    title: {
        fontSize: 24,
        
        marginBottom: 32,
        color: '#FFFFFF',
        marginBottom:40
    },
    formContainer: {
        width: '100%',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop:20
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        width: 370,
        height: 48,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#212121',
    },
    textInputContainer: {
        flex: 1,
    },

    textInput: {
        height: 40,
        paddingHorizontal: 8,
        color: 'white',
    },

    passwordIconContainer: {
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 370,
        marginBottom: 16,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        color: 'white',
        marginLeft: 8,
    },
    forgotPasswordButtonText: {
        color: '#B508F1',
        textDecorationLine: 'underline',
    },
    loginButton: {
        backgroundColor: '#B508F1',
        borderRadius: 9,
        padding: 12,
        alignItems: 'center',
        marginBottom: 50,
        width: 370,
        height: 50,
        marginTop: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpButton: {
        backgroundColor: '#27ae60',
        borderRadius: 9,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUp:{
        flex: 1,
    },
    eye: {
        padding: 10,
    },
    icon: {
        padding: 13
    },
    signUp: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpText: {
        color: '#B508F1',
       
    },
    accountText: {
        color: 'white',
       
    },

});

export default ForgotPassword;
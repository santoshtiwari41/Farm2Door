import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginImage from '../../assets/images/LoginImage';
import { useNavigation } from '@react-navigation/native';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import PasswordInput from '../../components/PasswordInput';

const Signin = () => {
    const navigation=useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const[notName,setNotName]=useState(false)

    const handleLogin = () => {
        console.log(username,password)
        
    };

    const handleSignUp = () => {
     
        navigation.navigate('Signup');
     
       
    };

    const handleForgotPassword = () => {
       navigation.navigate('ForgotPassword')
        console.log('forget password')
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <View style={styles.container}>
          
                <LoginImage />
                <Text style={styles.title}>Welcome to Farm to door</Text>
               
                    <InputComponent placeholder="Enter full name"
                     iconName="person" value={username}
                     onChangeText={setUsername} />
                    
                   <PasswordInput placeholder="Enter your password"
                    iconName="key"
                     value={password} 
                     secureTextEntry={!showPassword}
                     onChangeText={setPassword}
                     
                     />
                     {notName&& <Text style={{marginTop:-10,marginBottom:10}}>invalid username or password</Text>}
                  
                    <View style={styles.row}>
                        <View style={styles.rememberMeContainer}>
                            <TouchableOpacity onPress={toggleRememberMe}>
                                <Ionicons
                                    name={rememberMe ? 'checkbox' : 'square-outline'}
                                    size={22}
                                    color={rememberMe ? '#8b2ff5' : '#888'}
                                />
                            </TouchableOpacity>
                            <Text style={styles.rememberMeText}>Remember Me</Text>
                        </View>
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                   <ButtonComponent title="login" onPress={handleLogin} />

                    <View style={styles.signUp}>
                        <Text style={styles.accountText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
               
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        
        backgroundColor:'white',
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        
        marginBottom: 32,
       
        marginTop:15
    },
    formContainer: {
        width: '100%',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
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
        color: 'black',
        marginLeft: 8,
        fontSize: 14.5,
    },
    forgotPasswordButtonText: {
        color: '#8b2ff5',
        textDecorationLine: 'underline',
        fontSize: 14.5,
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
    signUp: {
        flex: 1,
    },
    
   
    signUp: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    signUpText: {
        color: 'black',
        fontSize: 16,
        color:'#8b2ff5',
        paddingLeft:16,
        
    },
    accountText: {
        color: 'black',
        fontSize: 16,
        fontWeight:'bold',
        marginRight:16
    },
});

export default Signin;
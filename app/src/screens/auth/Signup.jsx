import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginImage from '../../assets/images/LoginImage';
import { useNavigation } from '@react-navigation/native';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import PasswordInput from '../../components/PasswordInput';

const Signup = () => {
    const [selected, setSelected] = useState('');
    const options = ['male', 'female'];
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');



    const handleSignUp = () => {

        console.log('register')
    };

    const handleForgotPassword = () => {

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
            <TouchableOpacity
                style={styles.header}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={27} color="#444444" />
            </TouchableOpacity>


            <Text style={styles.title}>Welcome to Farm to door</Text>

            <InputComponent placeholder="Enter full name"
                iconName="person" value={username}
                onChangeText={setUsername} />
                 <InputComponent placeholder="Enter address"
                iconName="navigate" value={address}
                onChangeText={setUsername} />
            <PasswordInput placeholder="Enter new password"
                iconName="key"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}

            />
            <PasswordInput placeholder="Confirm Password"
                iconName="key"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}

            />
           
           <View style={styles.questionContainer}>
  <Text style={{marginRight:40,
marginLeft:-50,fontSize:16}}>Gender</Text>
  <View style={styles.optionsContainer}>
    {options.map(option => {
      return (
        <TouchableOpacity
          key={option}
          style={styles.singleOptionContainer}
          onPress={() => setSelected(option)}>
          <View style={styles.outerCircle}>
            {selected === option ? (
              <View style={styles.innerCircle} />
            ) : null}
          </View>
          <Text style={{fontSize:16}}>{option}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
</View>

            <View style={styles.row}>
                <View style={styles.rememberMeContainer}>
                    <TouchableOpacity onPress={toggleRememberMe}>
                        <Ionicons
                            name={rememberMe ? 'checkbox' : 'square-outline'}
                            size={22}
                            color={rememberMe ? '#8b2ff5' : '#555555'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>Remember Me</Text>
                </View>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <ButtonComponent title="Sign up" onPress={handleSignUp} />

            <View style={styles.signUp}>
                <Text style={styles.accountText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                    <Text style={styles.signUpText}>Login</Text>
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


        backgroundColor: 'white',
        zIndex: 1,
    },
    title: {
        fontSize: 24,

        marginBottom: 32,

        marginTop: 15
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
        fontSize: 16,
    },
    forgotPasswordButtonText: {
        color: '#8b2ff5',
        textDecorationLine: 'underline',
        fontSize: 16,
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
        alignItems: 'space-between',
        marginTop: 16,
        justifyContent: 'space-between',
    },
    signUpText: {
        color: 'black',
        fontSize: 16,
        color: '#8b2ff5',
        paddingLeft: 16
    },
    accountText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 16
    },
    header: {
        marginLeft: -313,
        marginTop: -100,
        
    },
    
    questionContainer: {
        flexDirection: 'row', // Update to flexDirection: 'row'
        justifyContent: 'space-between',
        alignItems: 'center',
       
        marginTop:-40,
        marginBottom:10,
        marginLeft:45
      },
      optionsContainer: {
        flexDirection: 'row', // Added for aligning options horizontally
        marginLeft: 10, // Added for spacing between options
      },
      singleOptionContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row',
        margin:20
      },
      outerCircle: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
      },
      innerCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#B508F1',
      },
    
});

export default Signup;
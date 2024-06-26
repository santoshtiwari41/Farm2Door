import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import OtpImage from'../../assets/images/OtpImage';
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';



const Otp = (
) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
 
  const [otpp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '',5:'',6:'' });
  const[allOtp,setAllotp]=useState(false)
  
  const id = useSelector((state) => state.auth.userid);
  const otp = Object.values(otpp).join("")
  const otpno = async () => {
    try {
      const response = await axios.post(`http://192.168.23.6:8000/api/v1/customers/${id}/verify`,
 otp
      );
  
      console.log( response.data);
    } catch (error) {
      console.error('Error :', error);
    }
  };
  const navigation=useNavigation();
 
  
  const handleOtp = () => {
    otpno();
    console.log(typeof(otp),'otp')
    console.log(id)
    if (Object.values(otp).every(Boolean)) {
      setAllotp(true)
      navigation.navigate('Role');
      console.log('All OTP digits entered.');
    } else {
      console.log('Please enter all OTP digits.');
      setAllotp(true)
    }
    console.log(id, 'ohudh')

  
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="arrow-back"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.svg}>
      <OtpImage />
      </View>
      <Text style={styles.content}>
        Enter the OTP number just sent you 
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({ ...otpp, 1: text });
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({ ...otpp, 2: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({ ...otpp, 3: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({ ...otpp, 4: text });
              text ? fifthInput.current.focus() : thirdInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fifthInput}
            onChangeText={text => {
              setOtp({ ...otpp, 5: text });
              text ? sixthInput.current.focus() : fourthInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={sixthInput}
            onChangeText={text => {
              setOtp({ ...otpp, 6: text });
              !text && fifthInput.current.focus();
            }}
          />
        </View>
        
      </View>
      {allOtp&&  <Text style={{textAlign:'center',marginLeft:-50}}> Please enter all otp</Text>}
     
     <ButtonComponent title="Verify" onPress={handleOtp} disabled={!otp}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  otpNumberText: {
    fontSize: 16,
    lineHeight: 16 * 1.4,

  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: 50
  },
  otpText: {
    fontSize: 17,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
 
  headerContainer:{
    marginBottom:30,
    marginTop:-170,
    marginLeft:10
  },
  svg:{
   alignItems:'center',
   marginBottom:50
  }
  
});

export default Otp;
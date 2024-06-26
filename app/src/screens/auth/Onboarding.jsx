import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image,TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import data from '../../assets/data/CarouselData'
import ButtonComponent from '../../components/ButtonComponent'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {userId} from '../../redux/AuthReducer'

const Onboarding = () => {
  const navigation = useNavigation();
  const[id,setId]=useState();
  const dispatch = useDispatch();
  const addPhone = async () => {
    try {
      const response = await axios.post('http://192.168.23.6:8000/api/v1/customers/register', {
        phone,

      });
      dispatch(userId(response.data.customer._id));
  
      console.log('Phone number added successfully:', response.data);
    } catch (error) {
      console.error('Error adding phone number:', error);
    }
   
  };
   const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
       <Text style={styles.text1}>{item.title1}</Text>
       <Text style={styles.text2}>{item.title2}</Text>
       <Text style={styles.text3}>{item.title3}</Text>
      <Image source={ item.image } style={styles.image} />
     
    </View>
  );
  const [phone, setphone] = useState('');
  const[notphone, setNotphone] = useState(false)

  const handleInputChange = (input) => {
   
    const formattedInput = input.replace(/[^0-9]/g, '');
    setphone(formattedInput.trim());
  };

  const handleButtonPress = () => {
    if(phone.length==10 && (phone.startsWith('97') || phone.startsWith('98')))
     { addPhone();
      setNotphone(false); 
      console.log('Sending verification code to:', phone);
      navigation.navigate("OtpScreen")

    }
    else{
      setNotphone(true);
    }
   
    
  };
  const handleSkipLogin = () => {
  //  navigation.replace("ButtomTab");
   console.log('skip')
   
  };
 

  return (     
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'white' }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -50 : -340}
    >
      
      <TouchableOpacity onPress={handleSkipLogin}>
      <Text style={styles.skipLoginText}>SKIP LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.container}>
      <View style={styles.carousel}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={400}
          autoplay
          autoplayInterval={5000} 
          loop
        />
         </View>
         <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.countryCode}>+977</Text>
          <TextInput
            placeholder=""
            keyboardType="phone-pad"
            value={phone}
            onChangeText={handleInputChange}
            style={styles.textinput}
          />
         
        </View>
        
        {
          notphone&&<Text style={{marginLeft:50,}}>please entervalid phone number</Text>
        }
        <ButtonComponent title="GET OTP" onPress={handleButtonPress}/>
         </View>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between',
    marginTop:80
  },
  carousel: {
    
    flex:2
  },
  form: {
    flex:1,
    justifyContent:'flex-start',
   
  },
  input: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    width: 370,
    height: 48,
    marginBottom: 7,
    padding: 7,
    width: '100%',
    borderRadius: 5,
    marginLeft:30,
    marginRight:100,
   zIndex:1,
   color:'#000',
   width:351
  },
  textinput: {
    height: 40,
   marginRight:25,
   width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    
    
  },
  countryCode: {
    height: 40,
    padding: 8.5,
    paddingLeft: 5,
    fontSize: 16
  },
 
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginTop:-30,
    marginBottom:-50
    },
  text1:{
    marginTop:19,
    fontWeight:'bold',
    fontSize:22,
    color:'#166931',
  },
  text2:{
    marginTop:4,
    fontWeight:'bold',
    fontSize:22,
    color:'#166931'
  },
  text3:{
    marginTop:4,
    fontSize:18,
    color:'#166931'
  },
  skipLoginText:{
    marginTop:60,
   
    marginLeft:300,// for samsung
    textDecorationLine:'underline',
    color:'#8b2ff5',
    marginBottom:-60
    
  }
  
});

export default Onboarding;
import { View, Text ,StyleSheet} from 'react-native';
import React, { useEffect } from 'react';  
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
   
    const timeoutId = setTimeout(() => {
      navigation.navigate('Home'); 
    }, 2000);

   
    return () => clearTimeout(timeoutId);
  }, [navigation]); 

  return (
    <View style={styles.container}>
      <View  style={{marginTop:60}}>
      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:24,lineHeight:40,color:'#8b2ff5'}}>congratulation, your order placed succesfully.</Text>
      </View>
       
    <LottieView source={require('../assets/data/Splash.json')}
    autoPlay 
    loop={false}
      />
    
    </View>
  );
}
styles=StyleSheet.create({
    container:{
        flex: 1,
      padding:50,
        alignItems: 'center',
        justifyContent: 'space-betweeen',
    }
})

export default OrderScreen;
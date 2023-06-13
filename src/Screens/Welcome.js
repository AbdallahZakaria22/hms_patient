import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import logo from '../../assets/logo.png'
import { button1 } from '../common/button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const Welcome = ({ navigation }) => {
  
  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  
      if (isLoggedIn === 'true') {
       
        navigation.navigate('Patient');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
      <View style={styles.container}>
    
        
        <View style={styles.container1}>
        
        <Image style={styles.logo} source={logo}/>
      <Text style={button1}
      onPress={() => navigation.navigate('Login')}
      >Login</Text>
      <Text style={button1}
      onPress={() => navigation.navigate('Signup')}
      >ٍSign Up</Text>
        </View>
      </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    display:'flex',
  },
  patternbg:{
    position:'absolute',
    top:0,
    width:'100%',
    height:'100%',
    zIndex:-1,
  },
  head:{
    fontSize:30,
    color:'#fff',

  },
  container1:{
  display:'flex',
  alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%',
 
  },
  logo:{
    height: '12%',
    resizeMode: 'contain',
    marginBottom: 50,
  }
})
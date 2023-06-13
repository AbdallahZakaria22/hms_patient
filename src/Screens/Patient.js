import { StyleSheet, Text, View,Linking } from 'react-native'
import React from 'react'
import { button1} from '../common/button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Patient = ({ navigation }) => {

  async function payOrder() {
    
    let {data} = await axios.get(`http://192.168.1.7:3000/patient/createOrder`,{
      headers:{token:`${await AsyncStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(`${errr.response.data.Error}`)
       })
    
    if (data.message === 'success')
    {
      
      Linking.openURL(`${data.URL}`);
    }
    
  }
  const logout = async () => {
    try {
      
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('Token');
      
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={button1}
        onPress={() => navigation.navigate('Dortors')}
        >View  Dortors</Text>
        <Text style={button1}
        onPress={() => navigation.navigate('Appointment')}
        >View Appointment</Text>
      </View>

      <View style={styles.container1}>
        <Text style={button1}
        onPress={() => navigation.navigate('Rooms')}
        >View Rooms</Text>
        <Text style={button1}
        onPress={() => navigation.navigate('BookRoom')}
        >View Book Room</Text>

      </View>

      <View style={styles.container1}>
        <Text style={button1}
        onPress={() => navigation.navigate('LabReport')}
        >View Lab Report</Text>
        <Text style={button1}
        onPress={() => navigation.navigate('XrayReport')}
        >View Xray Report</Text>

      </View>
      <View style={styles.container1}>      
        <Text style={button1}
        onPress={() =>(payOrder())}
        >CheckOut</Text>
        <Text style={button1}
        onPress={() =>(logout())}
        >logOut</Text>
      </View>
    </View>
  )
}

export default Patient

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems: 'center',
          justifyContent: 'center',
      },container1:{
        display:'flex',
        alignItems: 'center',
          justifyContent: 'center',
          height:'20%',
          width:'60%',
         borderWidth:2,
         borderColor:'#09c',
         borderRadius: 30,
         margin:5
        },
})
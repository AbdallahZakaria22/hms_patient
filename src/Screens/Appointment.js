import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { button1,button3} from '../common/button'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'

const Appointment = ({ navigation }) => {

  const [data, setData] = useState([])

  const [userData,setUerData]=useState(null)
  async function saveUserData(){
    let encodedToken = await AsyncStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    setUerData(decodedToken.id)
    ViewAppointment(decodedToken.id)
    }

  async function ViewAppointment(id){
    let {data} = await axios.get(`http://192.168.1.7:3000/patient/ViewAppointment?userID=${id}`,{
      headers:{token:`${await AsyncStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(`${errr.response.data.Error}`)
       })

    setData(data.Doctor)
  }
  async function cancelBook(id){
    let {data} = await axios.delete(`http://192.168.1.7:3000/patient/cancelBookDoctor?idAppointment=${id}`,{
      headers:{token:`${await AsyncStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(`${errr.response.data.Error}`)
       })
 
    ViewAppointment(userData)
   
  
  } 
  useEffect(()=>{
    saveUserData();
  },[])

  return (
    <View style={styles.container}>
       
    <FlatList
      data={data}
   
      keyExtractor={(item) => item.Time._id}
      contentContainerStyle={styles.flatListContainer}

      renderItem={({ item }) => (
          <View style={styles.item} key={item.Time._id}>

           <View style={styles.container2}>
           <Text style={styles.text1} >Doctor Name :</Text>
          
           <Text style={styles.text}>{item.user.userId.name}</Text>
           </View>
           <View style={styles.container2}>
           <Text style={styles.text1} >Specialization :</Text>
          <Text style={styles.text}>{item.user.Specialization}</Text>
            </View>
         


       
         <View style={styles.container2}>
            <Text  style={styles.text1}>Date:</Text>
            <Text  style={styles.text}>{item.Time.Date}</Text>
          
        
         </View>

        <View style={{marginTop:20}}>
        {item.findPrescription!==false &&(  
     <Text style={button1}
     onPress={() => navigation.navigate('Prescription')}
     >Prescription</Text>
)}
         {item.findPrescription!==true &&(  
     <Text style={button3}
     onPress={()=>{
      cancelBook(item.Time._id)
     }}
     >Cancle</Text>
)}
        </View>
        </View>
        
      )}
    />
  </View>
  )
}

export default Appointment

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingHorizontal: 16,
    width:'100%',
    height:'100%',
    display:'flex',
    alignItems: 'center',
      justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth:2,
    borderColor:'#09c'
  },
  container2:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
      paddingTop:5
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#09c',

    
  },
 
})
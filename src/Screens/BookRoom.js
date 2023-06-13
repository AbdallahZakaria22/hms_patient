import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { button1,button3} from '../common/button'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'

const BookRoom = ({ navigation }) => {
  const [data, setdata] = useState([])
  const [user, setuser] = useState([])
  
async function saveUser(){
    let encodedToken = await AsyncStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    setuser(decodedToken.id)
    viewRoom(decodedToken.id)
    }

  async function viewRoom(id){
    let {data} = await axios.get(`http://192.168.1.7:3000/patient/viewBookRoom?userID=${id}`,{
      headers:{token:`${await AsyncStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(`${errr.response.data.Error}`)
       })
       setdata([data.Room.Room])
 
  }
  async function deleteRoom(patientId,roomId){
    let {data} = await axios.delete(`http://192.168.1.7:3000/patient/cancelRoom?userID=${patientId}&roomID=${roomId}`,{
      headers:{token:`${await AsyncStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(`${errr.response.data.Error}`)
       })
  

    if (data.message =='success')
       {
        navigation.navigate('Patient')
        
       }

  }
 
  useEffect(()=>{
  saveUser()
  
  },[])

  return (
    <View style={styles.container}>
       
    <FlatList
      data={data}
   
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.flatListContainer}

      renderItem={({ item }) => (
          <View style={styles.item} key={item._id}>

        <View style={styles.container2}>
           <Text style={styles.text1} >Room Number :</Text>
          
           <Text style={styles.text}>{item.numberRoom}</Text>
           </View>

           <View style={styles.container2}>
           <Text style={styles.text1} >Room Type :</Text>
          
           <Text style={styles.text}>{item.RoomType}</Text>
           </View>

           <View style={styles.container2}>
           <Text style={styles.text1} >Price :</Text>
          <Text style={styles.text}>{item.price}</Text>
            </View>
         
            <Text style={button3}
              onPress={() => deleteRoom(user,item._id)}
             >Cancle </Text>

       
   
        
        </View>
        
      )}
    />
  </View>
  )
}

export default BookRoom

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
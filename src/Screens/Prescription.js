import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'
const Prescription = () => {
    const [user, setuser] = useState([])
    const [data, setdata] = useState([])
    const [doctorData, setdoctorData] = useState([])
    
    async function viewPrescription(id){
        let {data} = await axios.get(`http://192.168.1.7:3000/patient/viewPrescription?userID=${id}`,{
            headers:{token:`${await AsyncStorage.getItem('Token')}`}
          }).catch((errr)=>{
            console.log(`${errr.response.data.Error}`)
             })
    setdoctorData(data.DoctorName)
      setdata(data.data)
    
      
    } 
 async function saveUser(){
        let encodedToken = await AsyncStorage.getItem('Token');
      let decodedToken= jwtDecode(encodedToken);
      viewPrescription(decodedToken.id)
      setuser(decodedToken.id)
      }
      useEffect(()=>{
       saveUser()
      },[])
  return (
    <View style={styles.container}>
       
    <FlatList
      data={data}
   
      keyExtractor={(item,index) => item._id}
      contentContainerStyle={styles.flatListContainer}

      renderItem={({ item ,index}) => (
        <View style={styles.item} key={item._id}>

       {item.Medication.length>0 &&(
        <View style={styles.container2}>
          <Text  style={styles.text1}>Medication :</Text>

      <View >
        {item.Medication.map((med)=>(
       <Text  style={styles.text}>{med.value}</Text>
        ))}
       </View>
       
       </View>
       )}

       {item.X_ray.length>0 &&(
        <View style={styles.container2}>
          <Text  style={styles.text1}>X_ray :</Text>

      <View >
        {item.X_ray.map((ray)=>(
       <Text  style={styles.text}>{ray.value}</Text>
        ))}
       </View>
       
       </View>
       )}

       {item.Lab.length>0 &&(
        <View style={styles.container2}>
          <Text  style={styles.text1}>Lab :</Text>

      <View >
        {item.Lab.map((lab)=>(
       <Text  style={styles.text}>{lab.value}</Text>
        ))}
       </View>
       
       </View>
       )}
       
       {((item.Advice)!=='' && (item.Advice)!==' ') &&(
        <View style={styles.container2}>
          <Text  style={styles.text1}>Advice :</Text>

      
       <Text  style={styles.text}>{item.Advice}</Text>
      
       
       </View>
       )}
       <View style={styles.container2}>
          <Text  style={styles.text1}>Date :</Text>
       <Text  style={styles.text}>{item.datePatient}</Text>
       </View>

       <View style={styles.container3}>
          <Text  style={styles.text1}>Doctor Name :</Text>
       <Text  style={styles.text}>{(doctorData[index].name)}</Text>
       </View>
       

        
      </View>
      
    )}
    />
  </View>
  )
}

export default Prescription

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
          marginTop:10,
          borderBottomWidth:1,
          borderColor:'black'
      },
      container3:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
          marginTop:10,
         
      },
      text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        marginBottom:10,
      },
      text1: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#09c',
        marginRight: 30,
        marginBottom:10,
        
      },
     
})
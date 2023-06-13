import { StyleSheet, Text, View ,FlatList,Linking} from 'react-native'
import React, { useEffect, useState } from 'react'
import { button1} from '../common/button'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const XrayReport = () => {
    const [report, setreport] = useState([])

    async function Report() {
        let {data} = await axios.get(`http://192.168.1.7:3000/patient/viewX_RayReport`,{
            headers:{token:`${await AsyncStorage.getItem('Token')}`}
          }).catch((errr)=>{
            console.log(`${errr.response.data.Error}`)
             })
      setreport(data.X_RayReport)
      
    }
    useEffect(()=>{
      Report()
     },[])
  return (
    <View style={styles.container}>
       
    <FlatList
      data={report}
   
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.flatListContainer}

      renderItem={({ item }) => (
          <View style={styles.item} key={item._id}>

           <View style={styles.container2}>
           <Text style={styles.text1} >Doctor Name :</Text>
          
           <Text style={styles.text}>{item.prescription.doctor.userId.name}</Text>
           </View>

           <View style={styles.container2}>
           <Text style={styles.text1} >Specialization :</Text>
          <Text style={styles.text}>{item.prescription.doctor.Specialization}</Text>
            </View>
         
           <View style={styles.container2}>
           <Text style={styles.text1} >Radiologist Name :</Text>
          <Text style={styles.text}>{item.createdBy.name}</Text>
            </View>
         
           <View style={styles.container2}>
           <Text style={styles.text1} >Type :</Text>
          <Text style={styles.text}>{item.type}</Text>
            </View>
         
           <View style={styles.container2}>
           <Text style={styles.text1} >Price :</Text>
          <Text style={styles.text}>{item.price}</Text>
            </View>
         


       
    

        <View style={{marginTop:20}}>
       
     <Text style={button1}
     onPress={() => Linking.openURL(`http://192.168.1.7:3000/${item.path}`)}
     >View Report</Text>

        
        </View>
        </View>
        
      )}
    />
  </View>
  
  )
}

export default XrayReport

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
        marginRight: 10,
        
      },
})
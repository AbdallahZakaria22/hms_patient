import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React, { useEffect, useState ,useContext} from 'react'
import { button1} from '../common/button'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PatientContext} from '../Context/PatientContext';
const Dortors = ({ navigation }) => {
  const {setUserInfo} = useContext(PatientContext);
  const [data, setData] = useState([]);

 
  
  async function viewDoctors(){
    let {data} = await axios.get(`http://192.168.1.7:3000/patient/searchDoctor`,{
      headers:{token:`${await AsyncStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(`${errr.response.data.Error}`)
       })

    setData(data.Doctors);
   
  }
  useEffect(()=>{
    viewDoctors();
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
             <Text style={styles.text1} >Doctor Name :</Text>
            
             <Text style={styles.text}>{item.userId.name}</Text>
             </View>
             <View style={styles.container2}>
             <Text style={styles.text1} >Specialization :</Text>
            <Text style={styles.text}>{item.Specialization}</Text>
              </View>
           


         
           <View style={styles.container2}>
              <Text  style={styles.text1}>Days & Time :</Text>

          <View >
            {item.Times.Days.map((day)=>(
           <Text  style={styles.text}>{day}</Text>
            ))}
           </View>
           <View>
         {item.Times.Time.map((time)=>(
            <>
            <View style={styles.container2}>
               <Text style={styles.text}>{time.from}</Text>
           <Text style={styles.text} >{time.to}</Text>
           </View>
            </>
  ))}
         </View>
           </View>
            <Text style={button1}
        onPress={() => 
         { setUserInfo(item._id)
          navigation.navigate('BookDoctor')}}
        >Book Doctor</Text> 
          </View>
          
        )}
      />
    </View>
  );
}

export default Dortors

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingHorizontal: 16,
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
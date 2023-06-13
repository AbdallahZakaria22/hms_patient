import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState ,useContext} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { button1,button2} from '../common/button'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PatientContext} from '../Context/PatientContext';
import jwtDecode from 'jwt-decode'

const BookDoctor = ({ navigation }) => {
    const {userInfo} = useContext(PatientContext);
    const [data, setData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [userData,setUerData]=useState(null)

   async function saveUserData(){
        let encodedToken = await AsyncStorage.getItem('Token');
        let decodedToken= jwtDecode(encodedToken);
        setUerData(decodedToken)
        
        }

  async  function timeDetails(doctorId){
        let {data} = await axios.get(`http://192.168.1.7:3000/patient/timeDetails?doctorID=${doctorId}`,{
      headers:{token:`${await AsyncStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(`${errr.response.data.Error}`)
       })

    setData(data.Data.Days);
    
  }
  async function booking(id,userid,values){
    let {data} = await axios.post(`http://192.168.1.7:3000/patient/BookDoctor?doctorID=${id}&userID=${userid}`,values,{
        headers:{token:`${await AsyncStorage.getItem('Token')}`}
      }).catch((errr)=>{
        console.log(`${errr.response.data.Error}`)
         })
         if (data.message === 'success')
         {
           navigation.navigate('Appointment')
         }
    }
 let validationSchema=Yup.object({
        date:Yup.object({
          day: Yup.string().required('Day is required'),
        })
      })
 let formik = useFormik({ 
        initialValues:{
        date:{
          day:'',
          selDate:''
        }
        },validationSchema,
        onSubmit:(values)=>{
           booking(userInfo,userData.id,values)
      
         }
        
      })   
useEffect(()=>{
    saveUserData()
 timeDetails(userInfo);
 },[])
    

 const getMonthName = (monthNumber) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNames[monthNumber - 1];
    }
  
    return '';
  };
  const minDate = new Date(); // Today's date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7); 
  const handleDateChange = (date) => {
    setSelectedDate(date.format('MM-DD'));
    
      
          const selectedDate = new Date(date);
          const monthNumber = selectedDate.getMonth() + 1;
          const monthName = getMonthName(monthNumber);
          const day = selectedDate.getDate();
        const dates=(`${monthName} ${day}`);
        formik.setFieldValue("date.selDate", dates)
  
    toggleCalendar()
  };
  const toggleCalendar = () => {
    setIsVisible(!isVisible);
  };


  return (
    <View style={styles.container}>
     <View >
   <SelectDropdown 
   rowStyle={{backgroundColor:'#09c',width:'100%',  borderRadius:15,textAlign:'center',}}
   buttonStyle={{backgroundColor:'#09c',width:'50%',  borderRadius:15}}
   buttonTextStyle={{textAlign:'center'}}
   statusBarTranslucent
	data={data}

	onSelect={(selectedItem, index) => {
		
  formik.setFieldValue("date.day", selectedItem)
	}}
/>
  

   </View>
   <View style={styles.container1}>
   <Text style={button2} onPress={toggleCalendar}>Select Date</Text>
   {selectedDate.length>0 &&(  
     <Text style={button1} onPress={toggleCalendar}><Text style={styles.selectedDate}>{selectedDate}</Text></Text>
)}
   
   {isVisible && (
    <View style={styles.calendarPicker}>
      <CalendarPicker
    
        onDateChange={handleDateChange}
        selectedStartDate={selectedDate}
        allowRangeSelection={false}
        style={styles.calendarPicker}
        textStyle={styles.calendarText}
        selectedDayStyle={styles.selectedDay}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#09c"
        width={300}
      /></View>)}

    <View style={styles.container1}>
    <Text style={button1} onPress={formik.handleSubmit}>Book</Text>
    </View>
   
   </View>
    </View>
  )
}

export default BookDoctor

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems: 'center',
          justifyContent: 'center',
      },
    container1:{
        width:'100%',
        // height:'30%',
        display:'flex',
        alignItems: 'center',
          justifyContent: 'center',
          marginTop:20
      },
      selectedDate: {
        fontSize: 18,
        marginBottom: 20,
        marginLeft:10
      },
      calendarPicker:{
        borderWidth:2,
        borderColor: '#09c',
        borderRadius: 10,
       marginTop:5,
        padding: 20,
        
        
      },
      calendarText:{
        color: '#333',
      },
      selectedDay:{
        backgroundColor:'#2979ff',
        borderRadius:5,
      },
})
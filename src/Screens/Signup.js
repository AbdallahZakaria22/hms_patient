import { StyleSheet, Text, View ,ScrollView, TextInput} from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { head1,formgroup,label, input,err,input1} from '../common/formCss'
import { button1} from '../common/button'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';
const Signup = ({ navigation }) => {
  const [messageError,setmessageError]=useState('')
  const [isVisible, setIsVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
    formik.setFieldValue("DOB", date.format('YYYY-MM-DD'))
  
    toggleCalendar()
  };
  const toggleCalendar = () => {
    setIsVisible(!isVisible);
  };

  const  dropdownOptions = ["Male","Female"];


  async function handleRegister(values){
   console.log(values);
     let { data }= await axios.post(`http://192.168.1.7:3000/user/SingnUp`,values).catch((errr)=>{
    
  
     setmessageError(`${errr.response.data.Error}`)
     })
  
      if (data.message === 'success')
      {
        navigation.navigate('Login')
      }
    }
    let validationSchema=Yup.object({
      name:Yup.string().required('Name is required').min(3,'Name minLenth 3').max(20,'Name maxLenth 20'),
      email:Yup.string().required('Email is required').email('Email is invaled'),
      password:Yup.string().required('password is required').matches(/^[A-Za-z0-9@$*#%-_]{3,10}$/,"Password Not Matching"),
      repeat_password:Yup.string().required('repeat_password is required').oneOf([Yup.ref('password')],"password and rePassword dosent match"),
      Mobile:Yup.string().required('Mobile is required').matches(/^01[0125][0-9]{8}$/,"Mobile is invalid"),
      Gender:Yup.string().required('Gender is required'),
     
      Address:Yup.string().required('Address is required')
    })
    let formik = useFormik({ 
      initialValues:
      {
          name:"",
          email:'',
          password:'',
          repeat_password:"",
          Mobile:"",
          Gender:'',
          DOB:'',
          Address:''
      
    },validationSchema,
    onSubmit:((values)=>{
      handleRegister(values)
 
    })
    })

  return (
    <View style={styles.container}>
    
    <View style={styles.container1}>
    <View style={styles.s1}>

</View>
<View style={styles.s2}>
      <ScrollView >
   <Text style={head1}>Create a New Account</Text>
   {messageError.length>0?<Text style={err}>{messageError}</Text>:null}
   <View style={formgroup}>
   <Text style={label}>Name</Text>
   <TextInput style={input}
     placeholder="Your Name"
     value={formik.values.name}
     onChangeText={formik.handleChange('name')}
   />
   {formik.errors.name && (
     <Text  style={err}>{formik.errors.name}</Text>
   )}
   </View>
   <View style={formgroup}>
   <Text style={label}>Email</Text>
   <TextInput style={input}
     placeholder="Email"
     value={formik.values.email}
     onChangeText={formik.handleChange('email')}
   />
   {formik.errors.email && (
     <Text  style={err}>{formik.errors.email}</Text>
   )}
   </View>
   
   <View style={formgroup}>
   <Text style={label}>Password</Text>
   <TextInput style={input}
     placeholder="Password"
     value={formik.values.password}
     onChangeText={formik.handleChange('password')}
     secureTextEntry={true}
   />
   {formik.errors.password && (
     <Text  style={err}>{formik.errors.password}</Text>
   )}
   </View>
   <View style={formgroup}>
   <Text style={label}>repeat_password</Text>
   <TextInput style={input}
   secureTextEntry={true}
     placeholder="Repeat_Password"
     value={formik.values.repeat_password}
     onChangeText={formik.handleChange('repeat_password')}
   />
   {formik.errors.repeat_password && (
     <Text  style={err}>{formik.errors.repeat_password}</Text>
   )}
   </View>
   <View style={formgroup}>
   <Text style={label}>Mobile</Text>
   <TextInput style={input}
     placeholder="Mobile"
     value={formik.values.Mobile}
     onChangeText={formik.handleChange('Mobile')}
     keyboardType={'phone-pad'}
   />
   {formik.errors.Mobile && (
     <Text  style={err}>{formik.errors.Mobile}</Text>
   )}
   </View>
   <View style={formgroup}>
   <Text style={label}>Gender</Text>
   <View >
   <SelectDropdown 
   rowStyle={{backgroundColor:'#09c',width:'80%',  borderRadius:15,textAlign:'center',marginHorizontal:50}}
   buttonStyle={{backgroundColor:'#09c',width:'100%',  borderRadius:15}}
   buttonTextStyle={{textAlign:'center'}}
   statusBarTranslucent
	data={dropdownOptions}
	onSelect={(selectedItem, index) => {
		
   formik.setFieldValue("Gender", selectedItem)
	}}
/>
  
   {formik.errors.Gender && (
     <Text  style={err}>{formik.errors.Gender}</Text>
   )}
   </View>
   </View>
   <View style={formgroup}>
   <Text style={label}>Birth Date</Text>
   <Text style={input} onPress={toggleCalendar}><Text style={styles.selectedDate}>{selectedDate}</Text></Text>
   
   {isVisible && (
    <View style={styles.calendarPicker}>
      <CalendarPicker
     
      // ={{backgroundColor:'#09c',width:'90%',  borderRadius:15}}
        onDateChange={handleDateChange}
        selectedStartDate={selectedDate}
        allowRangeSelection={false}
        style={styles.calendarPicker}
        textStyle={styles.calendarText}
        selectedDayStyle={styles.selectedDay}
        
        todayBackgroundColor="#09c"
        width={370}
      /></View>)}
   
   </View>
   <View style={formgroup}>
   <Text style={label}>Address</Text>
   <TextInput style={input1}
     placeholder="Address"
     value={formik.values.Address}
     onChangeText={formik.handleChange('Address')}
   />
   {formik.errors.Address && (
     <Text  style={err}>{formik.errors.Address}</Text>
   )}
   </View>
  
  
     <Text style={button1} onPress={formik.handleSubmit}>Register</Text>
     
     </ScrollView>
     </View>

    </View>
    </View>
  )
}

export default Signup

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
  container1:{
    display:'flex',
    alignItems: 'center',
      justifyContent: 'center',
      height:'100%',
      width:'100%',
    },
    s1: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '5%',
  },
    s2:{
   display:'flex',
   borderWidth:2,
   borderColor:'#09c',
   width:'100%',
   height:'90%',
   marginTop:30,
   borderTopLeftRadius:30,
   borderTopRightRadius:30,
   padding:20,
    },
    fp:{
     display:'flex',
  
     alignItems:'flex-end',
     marginHorizontal:10,
     marginVertical:5,
    
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
import { StyleSheet, Text, View ,Image, TextInput} from 'react-native'
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { head1,formgroup,label, input,link2,link3,err} from '../common/formCss'
import { button1} from '../common/button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
const ForgetPasswor = ({ navigation }) => {
  const [messageError,setmessageError]=useState('')
  async function handlePassword(values){
    
    let {data} = await  axios.patch(`http://192.168.1.7:3000/user/sendCode`,values).catch((errr)=>{
   
     setmessageError(`${errr.response.data.Error}`)
      })
    
 
      if (data.message === 'success')
     {
      
      navigation.navigate('RestPassword')
      
     }
   
  }
 
  let validation = Yup.object({
    email:Yup.string().required('Email is Required').email('Email invalid'),
  })
 
  let formik = useFormik({
    initialValues:{
     email:'',
    },
    validationSchema:validation,
    onSubmit:handlePassword
  })
 
  return (
    <View style={styles.container}>
    <View style={styles.s2}>
   <Text style={head1}>Forget Password</Text>
   {messageError.length>0?<Text style={err}>{messageError}</Text>:null}
   

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
     <Text style={button1}  onPress={formik.handleSubmit}>Send</Text>
     
      </View>
      </View>
  )
}

export default ForgetPasswor

const styles = StyleSheet.create({

  container:{
    width:'100%',
        height:'100%',
        display:'flex',
        alignItems: 'center',
          justifyContent: 'center',
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
    s1:{
      color:'#fff',
      fontSize:17,
      display:'flex',
      
      alignItems: 'center',
      justifyContent: 'center',
    },
    s2:{
   display:'flex',
  borderWidth:2,
  borderColor:'#09c',
  //backgroundColor:'rgba(125, 140, 140, 0.5)',
   width:'90%',
   
   borderWidth:2,
   borderColor:'#09c',
   borderRadius: 30,
   padding:20,
    },
    fp:{
     display:'flex',
    //  justifyContent:'flex-end',
   
     marginHorizontal:10,
     marginVertical:5,
    
    },
    logo: {
      height: 80,
      resizeMode: 'contain',
  },
  link4:{
    color:'red'
  }
    
})
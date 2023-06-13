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
const RestPassword = ({ navigation }) => {
  const [messageError,setmessageError]=useState('')
  async function handleLogin(values){
    
    let {data} = await  axios.post(`http://192.168.1.7:3000/user/restPassword`,values).catch((err)=>{
       
    setmessageError(err.response.data.message)
        
      })   
  
      if (data.message === 'success')
      {
        navigation.navigate('Login')
      }
   
    }
    let validationSchema=Yup.object({
      newPassword:Yup.string().required('newPassword is required'),
      confirmPassword:Yup.string().required('confirmPassword is required').oneOf([Yup.ref('newPassword')],"password and rePassword dosent match"),
    })
    let formik = useFormik({
      initialValues:{
        email:'',
        code:'',
        newPassword:'',
        confirmPassword:''
      },validationSchema,
      onSubmit:handleLogin
    });
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

   <View style={formgroup}>
   <Text style={label}>code</Text>
   <TextInput style={input}
   
   placeholder="code"
   value={formik.values.code}
   onChangeText={formik.handleChange('code')}
 />
 {formik.errors.code && (
   <Text  style={err}>{formik.errors.code}</Text>
 )}
   </View> 
   <View style={formgroup}>
   <Text style={label}>New Password</Text>
   <TextInput style={input}
     placeholder="newPassword"
     value={formik.values.newPassword}
     onChangeText={formik.handleChange('newPassword')}
     secureTextEntry={true}
   />
   {formik.errors.newPassword && (
     <Text  style={err}>{formik.errors.newPassword}</Text>
   )}
   </View>
   <View style={formgroup}>
   <Text style={label}>confirmPassword</Text>
   <TextInput style={input}
   secureTextEntry={true}
     placeholder="confirmPassword"
     value={formik.values.confirmPassword}
     onChangeText={formik.handleChange('confirmPassword')}
   />
   {formik.errors.confirmPassword && (
     <Text  style={err}>{formik.errors.confirmPassword}</Text>
   )}
   </View>
     <Text style={button1}  onPress={formik.handleSubmit}>Save</Text>
     
      </View>
      </View>
  )
}

export default RestPassword

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
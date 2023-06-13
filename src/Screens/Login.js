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

const Login = ({ navigation }) => {

  const [messageError,setmessageError]=useState('')

 async function saveUser(){
    let encodedToken = await AsyncStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    if(decodedToken.role == 'user')navigation.navigate('Patient')
    }

  async function handelLogin(values){
    let { data }= await axios.post(`http://192.168.1.7:3000/user/signIn`,values).catch((errr)=>{
      setmessageError(`${errr.response.data.Error}`)
       })
      
        if (data.message === 'success')
        {
          AsyncStorage.setItem('Token', data.Token);
          AsyncStorage.setItem('isLoggedIn', 'true');
          saveUser()
          
        }
  }
    let validationSchema=Yup.object({
      email:Yup.string().required('Email is required').email('Email is invaled'),
      password:Yup.string().required('password is required').matches(/^[A-Za-z0-9@$*#%-_]{3,10}$/,"Password Not Matching"),
   
    })
    let formik = useFormik({ 
      initialValues:
      {
         
          email:'',
          password:'',
         
      
    },validationSchema,
    onSubmit:((values)=>{
      handelLogin(values)
 
    })
    })







  return (
    <View style={styles.container}>
    <View style={styles.container1}>
      <View style={styles.s1}>
         <Image style={styles.logo} source={logo}/>
      </View>
      <View style={styles.s2}>
   <Text style={head1}>Login</Text>
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
   <Text style={label}>Password</Text>
   <TextInput style={input}
   
   placeholder="Password"
   secureTextEntry
   value={formik.values.password}
   onChangeText={formik.handleChange('password')}
 />
 {formik.errors.password && (
   <Text style={err}>{formik.errors.password}</Text>
 )}
   </View>
   <View style={styles.fp}>
    <Text style={styles.link4} onPress={() => navigation.navigate('ForgetPasswor')}>Forget Password ?</Text>
     </View>
     <Text style={button1}  onPress={formik.handleSubmit}>Login</Text>
     <Text style={link2}>Don’t Have Account?&nbsp;<Text style={link3}
      onPress={() => navigation.navigate('Signup')}
     >Register Now</Text></Text>
      </View>

    </View>
    </View>
  )
}

export default Login

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
    s1:{
      color:'#fff',
      fontSize:17,
      display:'flex',
      height:'40%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    s2:{
   display:'flex',
  borderWidth:2,
  borderColor:'#09c',
  //backgroundColor:'rgba(125, 140, 140, 0.5)',
   width:'100%',
   height:'60%',
   borderTopLeftRadius:30,
   borderTopRightRadius:30,
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
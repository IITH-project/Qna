import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'
import { Box, Button, Flex, FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {EmailIcon,LockIcon} from '@chakra-ui/icons'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { AiFillApple } from 'react-icons/ai';
import axios from 'axios';
import Router from 'next/router';
import { useToast } from '@chakra-ui/react'
import Signup from './Signup';
export default function Login() {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const toast =useToast()
  const [signup, setsignup] = useState(false)


  const handleSubmit= async (e)=>{
    e.preventDefault()
    if(email!==password){
     return toast({
        title: "error",
        description: "password is incorrect",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    const {data}=await axios.post('/api/login',{
      email,
      password
    })
    // console.log(data)
    if(data.error){
      toast({
        title: data.message,
        description: "We've created your account for you.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    else{
    localStorage.setItem("userData",JSON.stringify(data[0]))
    setemail('')
    setpassword('')
    Router.back()
    }
  }

  const signUp=()=>{
    setsignup(!signup)
  }

  return (
    <div className={styles.main_div}>
    {/* <img src='/login_img/bac.jpg'/> */}
    <div className={styles.form_div}>
    {signup ? (<Signup/>):(<>
      {/* <h2 className={styles.login}>Login</h2> */}
    <img className = {styles.fb_image} src="fb_image.jpg" alt="fb_image"></img>
    <h1 className={styles.label_welcome}>WELCOME</h1>
    <form className = {styles.form} onSubmit={handleSubmit}>
      <Flex flexDirection={'column'}>
      <label className={styles.text_label}>User id :</label>
      <InputGroup border='1px' borderRadius={'8px'} >
      <InputLeftElement pointerEvents="none">
          {<EmailIcon color="gray.300" />}</InputLeftElement>
          <Input  type="text" placeholder="user_id" backgroundColor={'#ffffff'}  value={email} onChange={e => setemail( e.target.value)} required/>
        </InputGroup>
    </Flex>
      <Flex flexDirection={'column'}>
      <label className={styles.text_label} >Password :</label>
      <InputGroup border='1px' borderRadius={'8px'} >
      <InputLeftElement pointerEvents="none">
          {<LockIcon color="gray.300" />}</InputLeftElement>
          <Input type="password" placeholder="****" backgroundColor={'#ffffff'} value={password} onChange={e => setpassword( e.target.value)}  required/>
        </InputGroup>
    </Flex>
    <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                mt={'0.5em'}
                
              >
                Login
              </Button>
    </form>
    
    </>)}
    <small>or</small>
    <div className={styles.inline}><FcGoogle size={'3em'}/> <FaFacebook size={'3em'}/> <AiFillApple size={'3em'}/></div>
    <small>Do not have account <button className={styles.signup} onClick={signUp}>{signup?"Login":"Signup"}</button></small>
    </div>
</div>
  )
}
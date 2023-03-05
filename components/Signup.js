import React, { useState } from 'react'
import styles from '@/styles/sign_up.module.css'
import { Box, Button, Flex, FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {EmailIcon,LockIcon} from '@chakra-ui/icons'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
// import { AiFillApple } from 'react-icons/Ai';
import axios from 'axios';
import Router from 'next/router';
import { useToast } from '@chakra-ui/react'
export default function Signup() {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const toast =useToast()


  const handleSubmit= async (e)=>{
    const {data}=await axios.post('/api/createuser',{
      email,
      password
    })
    console.log(data);
    if(data.error){
      toast({
        title: data.message,
        description: "We are unable to create your account please try again.",
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
    // console.log(data)
    // if(data.error){
    //   toast({
    //     title: data.message,
    //     description: "We've created your account for you.",
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   })
    // }
    // else{
    // localStorage.setItem("userData",JSON.stringify(data))
    // setemail('')
    // setpassword('')
    // Router.push('/')
    // }
  }

  return (
    <>
    <img className = {styles.signup_image} src="signup.webp" alt="fb_image"></img>
    <h3 className={styles.label}>Signup</h3>
    <form className = {styles.form}onSubmit={handleSubmit}>
      <Flex height={'18vh'} flexDirection={'column'} justifyContent={'space-between'}>
      <label className={styles.text_label}>User id :</label>
      <InputGroup border='1px' borderRadius={'8px'} >
      <InputLeftElement
            pointerEvents="none"
          ><EmailIcon color="gray.300" /></InputLeftElement>
          <Input type="text" placeholder="user_id" backgroundColor={'#ffffff'} value={email} onChange={e => setemail( e.target.value)} required/>
        </InputGroup>
        <label className={styles.text_label}>Password :</label>
      <InputGroup border='1px' borderRadius={'8px'} >
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
          <Input type="text" placeholder="*******" backgroundColor={'#ffffff'} value={password} onChange={e => setpassword( e.target.value)} required/>
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
                Register
              </Button>
    </form>
    </>
  )
}
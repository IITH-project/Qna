import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'
import { Box, Button, Flex, FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {EmailIcon,LockIcon} from '@chakra-ui/icons'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { AiFillApple } from 'react-icons/Ai';
import axios from 'axios';
import Router from 'next/router';
import { useToast } from '@chakra-ui/react'
export default function Login() {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const toast =useToast()


  const handleSubmit= async (e)=>{
    e.preventDefault()
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
    Router.push('/frontPage')
    }
  }

  return (
    <div className={styles.main_div}>
    <div className={styles.form_div}>
    <h3>Login</h3>
    <form onSubmit={handleSubmit}>
      <Flex flexDirection={'column'}>
      <label >Email</label>
      <InputGroup border='1px' borderRadius={'8px'} >
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
          <Input type="text" placeholder="example@gmail.com" value={email} onChange={e => setemail( e.target.value)} required/>
        </InputGroup>
    </Flex>
      <Flex flexDirection={'column'}>
      <label >Password</label>
      <InputGroup border='1px' borderRadius={'8px'} >
          <InputLeftElement
            pointerEvents="none"
            children={<LockIcon color="gray.300" />}
          />
          <Input type="password" placeholder="**********" value={password} onChange={e => setpassword( e.target.value)}  required/>
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
    <small>or</small>
    <div className={styles.inline}><FcGoogle/> <FaFacebook/> <AiFillApple/></div>
    <small>Don't have account Signup</small>
    </div>
</div>
  )
}

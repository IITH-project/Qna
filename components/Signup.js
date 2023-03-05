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
    e.preventDefault();
    const {data}=await axios.post('/api/createuser',{
      display_name:email,
      password
    })
    console.log(data);
    if(data[0].id !== null){
      toast({
        title: "successfull",
        description: `you have successfully create with  id ${data[0].id} Please login....`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setemail('')
      setpassword('')
      Router.push('/login')
    }
  }

  return (
    <>
    {/* <img className = {styles.signup_image} src="signup.webp" alt="fb_image"></img> */}
    <h3 className={styles.label}>Signup</h3>
    <form className = {styles.form} onSubmit={handleSubmit}>
      <Flex height={'18vh'} flexDirection={'column'} justifyContent={'space-between'}>
      <label >Name</label>
      <InputGroup border='1px' borderRadius={'8px'} >
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
          <Input type="text" backgroundColor={'#ffffff'} value={email} onChange={e => setemail( e.target.value)} required/>
        </InputGroup>
        <label >password</label>
      <InputGroup border='1px' borderRadius={'8px'} >
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
          <Input type="text" placeholder="********" value={password} onChange={e => setpassword( e.target.value)} required/>
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
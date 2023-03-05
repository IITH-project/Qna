import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import Link from 'next/link';
import Router from 'next/router';
import SearchModal from '@/components/SearchModal'

const NavLink = () => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, setsession] = useState(false)
  const [username, setusername] = useState()
  const [image_url, setimage_url] = useState()
  useEffect(() => {
    if(getCookie('auth-token')!==null && getCookie('auth-token')!==undefined){
      setsession(true)
    }
    else{
      setsession(false)
    }
  })
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('userData'))){
    setusername(JSON.parse(localStorage.getItem('userData')).display_name)
    setimage_url(JSON.parse(localStorage.getItem('userData')).profile_image_url)
    }
  }, [])

  const handleLogin=()=>{
    deleteCookie('auth-token')
    localStorage.removeItem('userData')
    setsession(false)
    Router.push('/')
  }
  
  return (
    <>
      <Box  px={5} backgroundColor='#fefdfd' position='sticky' top={'0'} h={'12vh'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <div className='logo'> <Link href="/">QnA</Link> </div>
        <SearchModal/>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {
                session? (<Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={image_url}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={image_url}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Button mx={'1.3em'} onClick={()=>Router.push('/profile')}>Profile</Button>
                    <Button onClick={handleLogin}>Logout</Button>
                  </MenuList>
                </Menu>):(<Button bgGradient="linear(to-r, teal.400, teal.600)" onClick={()=>{Router.push('/login')}}>Login</Button>)
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

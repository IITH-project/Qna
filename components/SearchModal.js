import { Search2Icon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    RadioGroup,
    Stack,
    Radio,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Card,
    CardHeader,
    Heading,
    CardBody,
    StackDivider,
    Box,
    Text,
  } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import axios from 'axios'
import Loding from '@/components/Loding'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'


export default function SearchModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('inside')
  const [loading, setloading] = useState(false)
  const [search, setsearch] = useState()
  const [searchData, setsearchData] = useState([])
  const [value, setValue] = useState('1')



  const handleSubmit= async (e)=>{
    setloading(true)
    // console.log(search)
    const {data}=await axios.post('/api/autocomplete',{
      name:search
    })
    setsearchData(data)
    if(search==''){
      setsearchData([])
    }
    setloading(false)
  }
  console.log(value)

  
  return (
    <>


      <Button h={'100%'} bgColor='#caa7a7' onClick={onOpen} className={styles.searcHere}>
        Search Here
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
        <InputGroup border='1px' borderRadius={'8px'} w='100%' height='100%'>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input h={'3rem'} type="text" placeholder='Enter your query' value={search} onKeyUp={handleSubmit} onChange={(e)=>{setsearch(e.target.value)}}  required/>
        </InputGroup>
        <RadioGroup onChange={setValue} value={value}>
      <Stack direction='row'>
        <Radio value='1'>username</Radio>
        <Radio value='2'>Tag</Radio>
      </Stack>
    </RadioGroup>
          <ModalBody>


<Card>
  <CardHeader>
    <Heading size='md'>Search Results</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
        { loading? (<Loding/>):( searchData.map((data,index)=>{ 
            return (<Box key={index}>
        <Text pt='2' fontSize='sm'>
            <Link onClick={onClose} href={`/frontPage/${data.id}`}>{data.display_name}</Link>
        </Text>
      </Box>)}))}
    </Stack>
  </CardBody>
</Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
  }
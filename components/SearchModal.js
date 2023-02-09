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
import MultipleTag from './multipleTag'
import {  CloseButton,  } from '@chakra-ui/react'


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

  const [tags, settags] = useState([])

  const removeTag=(indexTOremove)=>{
    console.log(indexTOremove)
    settags(tags.filter((_,index)=>index!=indexTOremove))
  }

  const addTag=(e)=>{
   if(e.target.value!=""){
    settags([...tags,e.target.value])
    e.target.value=""
   }
  }


  
  return (
    <>


      <Button h={'82%'} w='50%' mt={'30px'} bgGradient="linear(to-r, teal.400, teal.600)" onClick={onOpen} className={styles.searcHere}>
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
        
          {
            value=='1'?(<InputGroup border='1px' borderRadius={'8px'} w='100%' height='100%'>
            <InputLeftElement
              pointerEvents="none"
              bgGradient="linear(to-r, teal.400, teal.600)"
              children={<Search2Icon color="gray.300"  />}
              h='100%'
              width='3rem'
            />
            <Input h={'3rem'} marginLeft='13px' type="text" placeholder='Enter your query' value={search} onKeyUp={handleSubmit} onChange={(e)=>{setsearch(e.target.value)}}  required/>
          </InputGroup>):(
  <div className={styles.tages_input}>
              <div border='1px' borderRadius={'8px'} >
                <div
                  pointerEvents="none"
                  children={<ul className={styles.ul_item}>
                  {
                    tags.map((tag,index)=>{
                     return ( 
                      <li className={styles.list_item} key={index}>
                          <Box marginLeft={'7px'}>{tag}</Box>
                          <button onClick={()=>removeTag(index)}><CloseButton/></button>
                      </li>
                    )})
                  }
                </ul>}
                />
                 <Input color={'red'} type="text" placeholder='Press enter to add tag' onKeyUp={e=>(e.key=='Enter'? addTag(e):null)} />
                 <Button position={'absolute'} right='3px' bgGradient="linear(to-r, teal.400, teal.600)" >Go</Button>
              </div>
            </div>)
          }

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





import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormLabel,
    Box,
    CloseButton,
    Text,
  } from '@chakra-ui/react'
  import axios from 'axios'
  import dynamic from 'next/dynamic'
  import styles from "@/styles/Home.module.css";


  const Editor =dynamic(()=>import('@/components/editor'),{
    ssr:false
  })

export default function ProfileEdit({userPost,setuserPost}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [body, setbody] = useState()
    const [title, settitle] = useState()
    const [mtags, setmtags] = useState()
    const [tags, settags] = useState([])
    const [search2, setsearch2] = useState();
    const [searchData, setsearchData] = useState([]);
    const [searchData2, setsearchData2] = useState([]);
    const [value, setValue] = useState("3");

    const [loading, setloading] = useState(false);
    const handleSubmit2 = async (e) => {
      setloading(true);
      const { data } = await axios.post("/api/autocomplete", {
        name: search2,
        value,
      });
      console.log(data)
      setsearchData2(data);
      if (search2 == "") {
        setsearchData2([]);
      }
      setloading(false);
    };
  
    // const [tags, settags] = useState([]);
  
    const removeTag = (indexTOremove) => {
      // console.log(indexTOremove)
      settags(tags.filter((_, index) => index != indexTOremove));
    };
  
    const addTag = async (e) => {
      if (e.target.value != "") {
        settags([...tags, e.target.value]);
        e.target.value = "";
      }
    };
  
    const check3 = async (e) => {
      settags([...tags, e.target.innerText]);
      setsearch2("");
    };


    const handleSubmit= async(e)=>{
        e.preventDefault();
        let str=''
        // console.log(tags)
        tags.forEach((item)=>{
          str +='<'+item+'>'
        })

        const {data}=await axios.post('/api/createnewpost',{
            title,
            body,
            tags:str
        })
        setuserPost([...data,userPost])
        onClose()
    }
    return (
      <>
        <Button onClick={onOpen} position='unset'>CreateNewPost</Button>
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {tags.map((tag, index) => {
                      return (
                        <li className={styles.list_item} key={index}>
                          <Box marginLeft={"7px"}>{tag}</Box>
                          <button onClick={() => removeTag(index)}>
                            <CloseButton />
                          </button>
                        </li>
                      );
                    })}
                    <FormLabel>Tags</FormLabel>
                    <Input
                  color={"red"}
                  type="text"
                  value={search2}
                  onChange={(e) => {
                    setsearch2(e.target.value);
                  }}
                  placeholder="Press enter to add tag"
                  onKeyUp={(e) => {
                    handleSubmit2(e.key == "Enter" ? addTag(e) : null);
                  }}
                />
                {searchData2 && searchData2.map((data, index) => {
                          return (
                            <Box key={index}>
                              <Text pt="2" fontSize="sm">
                                <Button onClick={check3}>
                                  {data.tag_name}
                                </Button>
                              </Text>
                            </Box>
                          );
                        })}
                <form onSubmit={handleSubmit}>
                <FormLabel>title</FormLabel>
            <Input value={title} onChange={e=>settitle(e.target.value)} width={'80%'} h='3rem' mb={'2px'}  type="text" placeholder='title' />
            <FormLabel>Body</FormLabel>
            {/* <div>   <RichtextEdit  setbody={setbody} post_body={post.body}/>   </div> */}
            <div><Editor body={body} setbody={setbody} /></div>
            <Button type='submit'>Submit</Button>
            </form>
           
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

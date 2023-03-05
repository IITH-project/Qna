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

export default function ProfileEdit({post,setuserPost,userPost}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [body, setbody] = useState()
    const [title, settitle] = useState(post.title)
    const [mtags, setmtags] = useState(post.tags)
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
        // console.log("tags "+str)
      //  let tags=str
        const newState = userPost.map(obj => {
            // 👇️ if id equals 2, update country property
            if (obj.id === post.id) {
              return {...obj, title,body,tags:str};
            }
      
            // 👇️ otherwise return the object as is
            return obj;
          });
      
          setuserPost(newState);
        
        // console.log("suarj"+str)
        const {data}=await axios.put('/api/editpost',{
            id:post.id,
            title,
            body,
            tags:str
        })
        // console.log(data)
        onClose()
    }
    const Addtag=()=>{
      if(post.tags!==null){
        let addtags=post.tags.replaceAll('<',' ')
       let ttags=addtags.split('>')
     let newtags=ttags.filter(word => word.trim().length > 0);
        let arr=[]
        newtags.forEach((item)=>{
          arr=arr.concat(item)
        })
        settags(arr)
      }
    }
    useEffect(() => {
      Addtag()
    }, [mtags])
    
    return (
      <>
        <Button onClick={onOpen} position='unset'>Edit</Button>
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
                {/* {loading ? (
                        "loading"
                      ) : (
                        searchData2.map((data, index) => {
                          return (
                            <Box key={index}>
                              <Text pt="2" fontSize="sm">
                                <Button onClick={check3}>
                                  {data.tag_name}
                                </Button>
                              </Text>
                            </Box>
                          );
                        })
                      )} */}
                <form onSubmit={handleSubmit}>
                <FormLabel>title</FormLabel>
            <Input value={title} onChange={e=>settitle(e.target.value)} width={'80%'} h='3rem' mb={'2px'}  type="text" placeholder='title' />
            <FormLabel>Body</FormLabel>
            {/* <div>   <RichtextEdit  setbody={setbody} post_body={post.body}/>   </div> */}
            <div> {post && <Editor body={body} setbody={setbody} post_body={post.body}/>  } </div>
            <Button type='submit'>Submit</Button>
            </form>
           
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

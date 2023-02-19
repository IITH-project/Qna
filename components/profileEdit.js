import React, { useState } from 'react'
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
  } from '@chakra-ui/react'
  import axios from 'axios'
  import dynamic from 'next/dynamic'

  const Editor =dynamic(()=>import('@/components/editor'),{
    ssr:false
  })

export default function ProfileEdit({post,setuserPost,userPost}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [body, setbody] = useState()
    const [title, settitle] = useState(post.title)


    const handleSubmit= async(e)=>{
        e.preventDefault();
        const newState = userPost.map(obj => {
            // 👇️ if id equals 2, update country property
            if (obj.id === post.id) {
              return {...obj, title,body};
            }
      
            // 👇️ otherwise return the object as is
            return obj;
          });
      
          setuserPost(newState);
        
        console.log(post.id)
        const {data}=await axios.put('/api/editpost',{
            id:post.id,
            title,
            body
        })
        console.log(data)
        onClose()
    }
    return (
      <>
        <Button onClick={onOpen} position='unset'>Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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

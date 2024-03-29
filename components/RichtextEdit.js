import JoditEditor from 'jodit-react';
import React from 'react';
import axios from 'axios';

import { useRef } from 'react';
import { useState } from 'react';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

export default function Editor({id,Alldata,setData}) {
    const editor = useRef(null);
	const [content, setContent] = useState();

  const toast=useToast()
const  handleSubmit=async (event)=> {
    event.preventDefault();
    const {data}=await axios.post('/api/createanswer',{
      id,
      post:content
    })
    if(data.error){
      toast({
        title: "error",
        description: `Please Autenticate First`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    else{
    setData([...Alldata,data[0]])
    setContent('')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormLabel>Title</FormLabel>
      <Input width={'100%'} type="text" name="" id="" placeholder='title' />
      <FormLabel>Body</FormLabel>
    <JoditEditor
			ref={editor}
			value={content}
			onChange={newContent => setContent(newContent)}
		/>
    <Button type='submit'>submit</Button>
    </form>
  )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/layout'
import { Avatar, AvatarBadge, AvatarGroup, Button, Input } from '@chakra-ui/react'

export default function Comments({id}) {
    const [Comments, setComments] = useState([])
    const [comment, setcomment] = useState()

  const getComment= async ()=>{
    if(Comments.length===0){
  const {data}=await axios.post('/api/getComment',{
    post_id:id
  })
  setComments(data)
}
}
    useEffect(() => {
        getComment()
    }, [])

    const handleSubmit= async(e)=>{
      e.preventDefault();
      const {data}=await axios.post('/api/crComm',{
        post_id:id,
        comment
      })
      if(!data.err){
      setComments([data[0],...Comments])
      setcomment('')
      }
      else{
        console.log("some error occured")
      }
    }
  return (
    <>
    <form style={{display:"flex"}} onSubmit={handleSubmit}>
      <Input variant='flushed' value={comment} onChange={e=>setcomment(e.target.value)} placeholder='Post your comments' />
      <Button type='submit'>post</Button>
    </form>
    <div>
      {Comments.map((data,index)=>{
        return (
            <Box borderBottom={'0.5px'} borderColor='whiteAlpha.100' key={index} fontSize={'1.2em'}><Avatar size={'sm'} name={data.user_display_name?data.user_display_name:(data.text) }/> {data.text}</Box>
        )
      })}
    </div>
    </>
  )
}

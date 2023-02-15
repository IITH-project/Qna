import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/layout'
import { Avatar, AvatarBadge, AvatarGroup, Button, Input } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'

export default function Comments({id}) {
    const [Comments, setComments] = useState([])
    const [commentspost, setcommentspost] = useState()

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

    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log("it has to submit"+commentspost)
      setcommentspost('')
    }
  return (
    <>
    <form  style={{display:"flex"}} className='formComments' onSubmit={handleSubmit}>
      <Input variant='flushed' value={commentspost} onChange={e=>setcommentspost(e.target.value)} marginBottom={'3px'} placeholder='Post your comments' />
      <Button type='submit'>post</Button>
    </form>
    <div>
      {Comments.map((data,index)=>{
        return (
            <Box borderBottom={'0.5px solid'} borderColor='#eaeaea' marginBottom='10px'  key={index} fontSize={'1.2em'}><Avatar size={'sm'} name={data.user_display_name?data.user_display_name:(data.text).substring(0,2) }/> {data.text}</Box>
        )
      })}
    </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@chakra-ui/layout'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

export default function Comments({id}) {
    const [Comments, setComments] = useState([])

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
    
  return (
    <div>
      {Comments.map((data,index)=>{
        return (
            <Box borderBottom={'0.5px'} borderColor='whiteAlpha.100' key={index}><Avatar size={'sm'} name={data.user_display_name?data.user_display_name:(data.text).substring(0,2) }/> {data.text}</Box>
        )
      })}
    </div>
  )
}

import React, { useState } from 'react'
import styles from '@/styles/multitag.module.css'
import { Button, CloseButton, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';

export default function multipleTag() {
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
    <div>
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
      </div>
    </div>
  )
}

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import { FaComment } from "react-icons/fa";
import axios from "axios";
import Comments from "@/components/Comments";
import RichText from '@/components/RichText'



export default function Posts({ data }) {
  const [richtext, setrichtext] = useState(false)
  return (
    <>
    <div className={styles.postMain}>
      <div className={styles.first_div_post}>
      {data.map((data)=>{
        return (
          
      <Accordion allowToggle  width={'90%'} margin={'auto'}>
      <AccordionItem marginBottom={'4rem'}>
        <h2>
          <Box as="span" flex="1" textAlign="left">
            <Heading size={'lg'}>{data.title && data.title }</Heading>
            <Box fontSize={'1.3em'} color={'black'} className={styles.para}  dangerouslySetInnerHTML={{ __html: data.body}}/>
          </Box>
        </h2>
        <AccordionButton position={"relative"} paddingLeft="0px">
          <AccordionIcon />
          <FaComment />
         </AccordionButton>
        <AccordionPanel pb={4} paddingLeft="41px">
          <Comments id={data.id}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
        )
      })}

      </div>
      <div className={styles.right_bar_post}>rightSidebar</div>
    </div>
    {richtext && <Box width={'60%'}><RichText/></Box>}
    <Button onClick={()=>setrichtext(!richtext)}>Post Your Answer</Button>
      
    </>
  );
}

export async function getServerSideProps(context) {
  console.log(context.query.posts);
  let { data } = await axios.get(
    `http://127.0.0.1:3000/api/post?search=${context.query.posts}`
  );

  return { props: { data } };
}

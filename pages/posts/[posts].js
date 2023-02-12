import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import { FaComment } from "react-icons/fa";
import axios from "axios";
import Comments from "@/components/Comments";

export default function Posts({ data }) {
  
  return (
    <div className={styles.postMain}>
      <div className={styles.first_div_post}>
      {data.map((data)=>{
        return (
          
      <Accordion allowToggle>
      <AccordionItem marginBottom={'4rem'}>
        <h2>
          <Box as="span" flex="1" textAlign="left">
            <Heading size={'lg'}>{data.title? data.title: <div>No title 😂 </div>}</Heading>
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
  );
}

export async function getServerSideProps(context) {
  console.log(context.query.posts);
  let { data } = await axios.get(
    `http://127.0.0.1:3000/api/post?search=${context.query.posts}`
  );

  return { props: { data } };
}

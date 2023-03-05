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
  Input,
} from "@chakra-ui/react";
import { FaCheckDouble } from 'react-icons/fa';
import styles from "@/styles/Home.module.css";
import styles1 from '@/styles/posts.module.css';
import { FaComment } from "react-icons/fa";
import axios from "axios";
import Comments from "@/components/Comments";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
const Editor =dynamic(()=>import('@/components/RichtextEdit'),{
  ssr:false
})


export default function Posts({ data1 }) {
  // console.log(data1)
  const [richtext, setrichtext] = useState(false)
  const [data2, setdata] = useState(data1)
  const [question, setquestion] = useState(data1.slice(0,1))
  // const [body, setbody] = useState()
  const router=useRouter()

  
  return (
    <>
    <div className={styles.postMain}>
      <div className={styles.first_div_post}>
      {data2.map((data,index)=>{
        return (
      <Accordion allowToggle  width={'90%'} margin={'auto'}>
        {(String(data.id) === router.query.posts) && <Box fontSize={'4xl'}>
          <Heading size={'lg'}>{data.title ? data.title:"No title" }</Heading>
          <Box fontSize={'35px'}>Tags: {data.tags && (data.tags.replaceAll('<','  ')).replaceAll('>',' ,')}</Box></Box>}
        { (String(data.id) !== router.query.posts) &&
        <>
        {(index==2) && <AccordionItem marginBottom={'4rem'} lineHeight='1.9'>

        <h2>
          <Box as="span" flex="1" textAlign="left">
            
            <Box  fontSize={'1.3em'} color={'black'} className={styles.para_posts}  dangerouslySetInnerHTML={{ __html: data.body}}/>
          </Box>
        </h2>
        <AccordionButton  paddingLeft="0px">
          <AccordionIcon />
          Comments
         </AccordionButton>
        <AccordionPanel className={styles.comment} pb={4} paddingLeft="41px">
          <Comments id={data.id}/>
        </AccordionPanel>
      </AccordionItem>}
      {(index>2) && <>{ (data.id===question[0].accepted_answer_id) ?
        <AccordionItem marginBottom={'4rem'} lineHeight='1.9'>
          <Box  ml='-2vw'><FaCheckDouble size={30}/></Box>
        <h2>
          <Box as="span" flex="1" textAlign="left">
            
            <Box  fontSize={'1.3em'} color={'black'} className={styles.para_posts}  dangerouslySetInnerHTML={{ __html: data.body}}/>
          </Box>
        </h2>
        <AccordionButton  paddingLeft="0px">
          <AccordionIcon />
          Comments
         </AccordionButton>
        <AccordionPanel className={styles.comment} pb={4} paddingLeft="41px">
          <Comments id={data.id}/>
        </AccordionPanel>
        </AccordionItem>:
        <AccordionItem marginBottom={'4rem'} lineHeight='1.9'>
        <h2>
          <Box as="span" flex="1" textAlign="left">
            
            <Box  fontSize={'1.3em'} color={'black'} className={styles.para_posts}  dangerouslySetInnerHTML={{ __html: data.body}}/>
          </Box>
        </h2>
        <AccordionButton  paddingLeft="0px">
          <AccordionIcon />
          Comments
         </AccordionButton>
        <AccordionPanel className={styles.comment} pb={4} paddingLeft="41px">
          <Comments id={data.id}/>
        </AccordionPanel>
        </AccordionItem>}
      
      </>}
      </>
      }
    </Accordion>
        )
      })}

      
        {richtext && <Box width={'75%' } m='auto'  borderBottom={'2px solid #d6c5c5'} boxSizing='border-box' padding={'10px'}><Editor id={router.query.posts} Alldata={data1} setData={setdata}/></Box>}
    <Button onClick={()=>setrichtext(!richtext)} display='block' m={'auto'} mb='2rem'>Post Your Answer</Button>
      </div>
      <div className={styles1.right_bar_post}>
        <div className={styles1.posted}>
        <div className={styles1.ele}>Posted By: {question[0].owner_display_name ?question[0].owner_display_name: "Anonymous user"  }</div>
        <div className={styles1.ele}>Posted On: {question[0].creation_date ?question[0].creation_date: "Unavailable"}</div>
        <div className={styles1.ele}>Score:  {question[0].score ?question[0].score: "0"}</div>
        <div className={styles1.ele}>Views:  {question[0].view_count ?question[0].view_count: "0"}</div>
        <div className={styles1.ele}>Answers:  {question[0].answer_count ?question[0].answer_count: "0"}</div>
        <div className={styles1.ele}>Comments:  {question[0].comment_count ?question[0].comment_count: "0"}</div>
        <div className={styles1.ele}>Tags: {question[0].tags && (question[0].tags.replaceAll('<','  ')).replaceAll('>',' ,')}</div>
        </div>
        </div>
    </div>
    {/* {richtext && <Box width={'60%'}><RichText id={router.query.posts} Alldata={data} setData={setdata} /></Box>} */}
    
      
    </>
  );
}
export async function getServerSideProps(context) {
  console.log(context.query.posts);
  let { data } = await axios.get(
    `http://127.0.0.1:3000/api/post?search=${context.query.posts}`
  );

  return { props: { data1:data } };
}

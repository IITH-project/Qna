import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Container, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loding from '@/components/Loding'
import { Search2Icon } from '@chakra-ui/icons'
import axios from 'axios'
import SearchModal from '@/components/SearchModal'
import { motion as m } from "framer-motion"

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <m.main className={styles.mainPage} initial={{ y: 90 }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>

        <Box display={'flex'} mt='3em' h={'85%'} position={'relative'} top='70px' justifyContent={'space-between'} >
          <div classname={styles.leftbox}>
            <Box width={'13rem'} mr={'2em'}>
              <nav className={styles.nav}>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </nav>
            </Box>
            <div className={styles.student}>
              <img src='/img/student.png' alt="image"></img>
            </div>
          </div>
          <Box maxHeight={'80vh'} overflow='auto'
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
            }}


            boxSizing='border-box' padding='0 33px' width={'80%'}>
            {data?.length > 0 ? data.map((data, index) => {
              return (index % 2 == 0 ? (<div className={styles.innerbox_even} key={index}>
                <div className={styles.inner1}>
                  <div className={styles.innner}>20 Votes</div>
                  <div className={styles.innner}> 4 Answers</div>
                  <div className={styles.innner}>342 Views</div>
                </div>
                <div className={styles.inner2}>
                  <div className={styles.innner2}>
                    <Link href={`/posts/${data.id}`} className={styles.title} >{data.title ? data.title : <div>No title 😂 </div>}</Link>
                    <div className={styles.para} dangerouslySetInnerHTML={{ __html: data.body.substring(0, 300) }} />
                  </div>
                  <div className={styles.post_date}>
                    posted on :
                  </div>
                </div>
              </div>) : (<div className={styles.innerbox_odd} key={index}>
                <div className={styles.inner1}>
                  <div className={styles.innner}>20 Votes</div>
                  <div className={styles.innner}> 4 Answers</div>
                  <div className={styles.innner}>342 Views</div>
                </div>

                <div className={styles.inner2}>
                  <div className={styles.innner2}>
                    <Link href={`/posts/${data.id}`} className={styles.title} >{data.title ? data.title : <div>No title 😂 </div>}</Link>
                    <div className={styles.para} dangerouslySetInnerHTML={{ __html: data.body.substring(0, 300) }} />
                  </div>
                  <div className={styles.post_date}>
                    posted on:
                  </div>
                </div>
              </div>))
            }) : <div>No post exits in database</div>}
          </Box>
        </Box>
      </m.main>
    </>
  )
}


export async function getServerSideProps(context) {
  function containsOnlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }

  if (containsOnlyNumbers(context.query.frontpage) == false) {
    var { data } = await axios.post(`http://127.0.0.1:3000/api/searchbytags`, {
      queryData: context.query.frontpage
    })
  }

  if (containsOnlyNumbers(context.query.frontpage)) {
    var { data } = await axios.get(`http://127.0.0.1:3000/api/hello?search=${context.query.frontpage}`)
  }

  return { props: { data } }
}




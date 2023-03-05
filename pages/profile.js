import React, { useEffect, useState } from "react";
import { Box, Button, Container, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import ProfileEdit from "@/components/profileEdit";
import {
  Image,
  Center,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
} from "@chakra-ui/react";
import Router from "next/router";
import CreatePost from '@/components/createPost'

export default function Profile() {
  const [userPost, setuserPost] = useState();
  const [userdata, setuserdata] = useState();
  const [search, setsearch] = useState()
  const toast=useToast()
  
  const usepost = async () => {
    const { data } = await axios.get("/api/userpost");
    // console.log(data);
    setuserPost(data);
  };
  const userData = async () => {
    const { data } = await axios.get("/api/getuser");
    // console.log(data)
    setuserdata(data);
  };

  useEffect(() => {
    usepost();
    userData();
  }, []);

  const DeletePost=async (id)=>{
    if (window.confirm("Do you really want to delete?")) {  
      const {data}=await axios.post(`/api/deletePost?id=${id}`)
      if(data.error){
         toast({

          title: "error",
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        Router.push('/login')
      }
      else{
      setuserPost((current) =>
      current.filter((fruit) => fruit.id !== id)
    )
      }
    }   
  }
  

  return (
    <Container maxWidth={"80%"}>
      <Container mt={4}>
        <Image
          src={userdata && userdata[0].profile_image_url}
          alt="suraj"
          boxSize="200px"
          borderRadius="full"
          fallbackSrc="hhttps://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
          mx="auto"
        />
        <Center>
          <VStack>
            <Heading>{userdata && userdata[0].display_name}</Heading>
            <Text color="gray">{userdata && userdata[0].location}</Text>
            <div data={userdata && userdata[0].website_url} />
            <Text
              dangerouslySetInnerHTML={
                userdata && { __html: userdata[0].about_me }
              }
            />
            <HStack>
              UpVotes: {userdata && userdata[0].up_votes}
              downVotes:{userdata && userdata[0].down_votes}
              views:{userdata && userdata[0].views}
            </HStack>
          </VStack>
        </Center>
      </Container>

            <CreatePost setuserPost={setuserPost} userPost={userPost}/>
      <Box width={"75%"} margin="3rem auto">
        {userPost &&
          userPost.map((post,index) => {
            return (
              <div key={index} className={styles.profileDiv}>
                <h2 className={styles.profile_title}>
                  {post.title ? post.title : "No title"}{" "}
                </h2>
                <h3>
                  tags:{" "}
                  {post.tags &&
                    post.tags.replaceAll("<", " ").replaceAll(">", "")}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
                <ProfileEdit
                  post={post}
                  setuserPost={setuserPost}
                  userPost={userPost}
                />
                <Button mx={'10px'} position='unset' onClick={()=>DeletePost(post.id)} >Delete</Button>
              </div>
            );
          })}
      </Box>
    </Container>
  );
}

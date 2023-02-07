import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from "next/router";
import Header from '@/components/Header'
import { motion } from 'framer-motion';


export default function App({ Component, pageProps,router }) {
  return(
    <motion.div key={router.route} initial="intial" animate="animate" transition={{duration:0.15}}  variants={{
      intial:{
        y:1000
      },
      animate:{
        animationDelay:.01,
        y:0
      }
    }}>
    <ChakraProvider>
    {router.pathname !== "/login" && router.pathname !== "/"  && <Header />}
    <Component {...pageProps} />
    </ChakraProvider>
    </motion.div>
  )
}

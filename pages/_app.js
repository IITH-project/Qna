import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from "next/router";
import Header from '@/components/Header'


export default function App({ Component, pageProps }) {
  const router = useRouter();
  return(
    <ChakraProvider>
    {router.pathname !== "/login" && <Header />}
    <Component {...pageProps} />
    </ChakraProvider>
  )
}

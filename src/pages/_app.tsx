// import type { AppProps } from 'next/app'
// import {ChakraProvider} from '@chakra-ui/react'
// import { theme } from '../styles/theme'
// import { AuthContext } from '../context/AuthContext'

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <ChakraProvider resetCSS theme={theme}>
      
//       <AuthContext.Provider>
//         <Component {...pageProps} />
//       </AuthContext.Provider>   
//     </ChakraProvider>   
//   )
// }

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AuthContext, AuthContextProvider } from '../context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthContextProvider >
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}

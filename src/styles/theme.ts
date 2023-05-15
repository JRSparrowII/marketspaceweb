import {extendTheme} from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        blue: {
          700: '#364D9D',
          500: '#647AC7',
          100: '#dfe1ea',
        },
        gray: {
          700: '#1A181B',
          600: '#3E3A40',
          500: '#5F5B62',
          400: '#9F9BA1',
          300: '#D9D8DA',
          200: '#EDECEE',
          100: '#F7F7F8'
        },
        white: '#FFFFFF',
        red: {
          500: '#F75A68'
        }
    },
    fonts: {
        heading:'Roboto',
        body:'Roboto',        
    },
    styles: {
        global:{
            body:{
                bg: 'gray.100',
                color:'gray.700'
            }
        }
    }
})  
import { FormControl, Icon, FormErrorMessage, FormLabel, Input as ChakraInput, 
    InputProps as ChakraInputProps } from "@chakra-ui/react";
import {forwardRef, ForwardRefRenderFunction, useState} from 'react';
import {FieldError} from 'react-hook-form';
import {RiEyeLine, RiEyeOffLine} from 'react-icons/ri'

import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
// import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";


interface InputProps extends ChakraInputProps{
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
= ({name, label, error, ...rest}: InputProps, ref) =>{

    const [showPassword, setShowPassword] = useState(false);


    return (
        <FormControl isInvalid={!!error}> 
            {!! label && <FormLabel htmlFor={name}>{label}</FormLabel> }

            <ChakraInput 
                name={name} 
                id={name}
                // rightIcon={<Icon as={RiEyeLine} fontSize="35"/>}
                focusBorderColor='blue.500'
                bg="white"
                color='gray.700'
                variant="filled"
                // _hover={{
                //     bg: 'gray.100'
                // }}
                ref={ref}
                size="lg"
                {...rest}
            />

            {/* <InputGroup>
                <ChakraInput 
                    name={name} 
                    id={name}
                    focusBorderColor='orange.500'
                    bg="gray.900"
                    variant="filled"
                    _hover={{
                    bg: 'gray.900'
                    }}
                    ref={ref}
                    size="lg"
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    {...rest}
                />
                <InputRightElement width="4.5rem">
                    <IconButton
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    icon={showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    h="100%"
                    onClick={() => setShowPassword(!showPassword)}
                    />
                </InputRightElement>
            </InputGroup> */}

            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
            
        </FormControl> 
    );
}

export const Input = forwardRef(InputBase);
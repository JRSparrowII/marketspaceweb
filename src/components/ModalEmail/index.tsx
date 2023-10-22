import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Textarea
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

interface ModalEmailProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalEmail({ isOpen, onClose }: ModalEmailProps) {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoHome() {
    setIsLoading(true)
    await new Promise (resolve => setTimeout (resolve, 7500)); 
    // navigate('/');
    setIsLoading(false)
  }

  async function handleSaveData() {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 3000));    

    try {
      toast.success('Your message was send succsseful! Please wait seller contact', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setIsLoading(false);
      handleGoHome()

    } catch (error) {
      setIsLoading(true);

      toast.error('Não foi possível efetuar seu pagamento e cadastro, por favor tente mais tarde!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    }
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.700">Contact the Manufacturer</ModalHeader>
        <ModalHeader color="blue.400" fontSize={'sm'}>The manufacturer will reply to your request as soon as possible.</ModalHeader>
        <ModalCloseButton color="gray.700" />

        <ModalBody pb={6}>
          <FormControl>
            <FormLabel color="gray.700">Your Name</FormLabel>
            <Input ref={initialRef} color="gray.200" fontSize="sm" />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel color="gray.700">Email</FormLabel>
            <Input ref={initialRef} color="gray.200" fontSize="sm" />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel color="gray.700">Phone</FormLabel>
            <Input ref={initialRef} color="gray.200" fontSize="sm" />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel color="gray.700">Zip Code</FormLabel>
            <Input ref={initialRef} color="gray.200" fontSize="sm" />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel color="gray.700">Message to seller</FormLabel>
            <Textarea ref={initialRef} color="gray.200" fontSize="sm" placeholder="Tell us what are you interested in..." />
          </FormControl>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button onClick={onClose} bg="red.300" color={'white'}>Return</Button>
          <Button bg='blue.300' color={'white'} mr={3} isLoading={isLoading} onClick={handleSaveData}>
            Send Email
          </Button>
        </ModalFooter>
      </ModalContent>
      <ToastContainer/>
    </Modal>
  )
}
import { Box, Center, Image, useTheme } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { RxPlus } from 'react-icons/rx';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

  const [selectedFileUrl, setSelectedFileUrl] = React.useState('');
  const { colors, sizes } = useTheme();

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/png', 'image/jpeg'],
    maxFiles: 3
  });

  return (
    <Box
      {...getRootProps()}
      h={'150px'}
      w={'100%'}
      background='gray.300'
      borderRadius={8}
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      outline={0}
      cursor="pointer"
    >
      <input {...getInputProps()} accept={'image/*'} />

      {selectedFileUrl
        ? <Image src={selectedFileUrl} alt="File thumbnail" h={'100%'} w={'100%'} objectFit={'cover'} borderRadius={8}/>
        : (
          <Center display={'flex'} flexDirection={'column'} cursor="pointer">
            <RxPlus color={colors.gray[500]} size={sizes[8]}/>
          </Center>
        )
      }
    </Box>
  );
};

export default Dropzone;


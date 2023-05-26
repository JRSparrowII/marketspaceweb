import { Button as ButtonChakraBase, HStack, Text} from "@chakra-ui/react";

type Props = {
  title: string;
  variant?: 'default' | 'base1' | 'base2';
  icon?: JSX.Element;
  size?: 'total' | 'half' | 'small';
  onClick(): void;
  // loadingText?: string;
  isLoading?: boolean;
  // spinnerPlacement?:string;
}

export function ButtonDefault({ title, icon, isLoading, variant = 'default', size = 'half',...rest }: Props) {
  return (
    <ButtonChakraBase        
      w={size === "half" ? '50%' : size === 'total' ? '100%' : '15%'}
      h={size === "half" ? '10' : size === 'total' ? '12' : '10'} 
      type="button" 

      isLoading={isLoading}
      loadingText={"Aguarde..."}
      spinnerPlacement="end"
      
      bg={variant === 'default' ? 'gray.300' :  
        variant === 'base1' ? 'blue.500' : 'gray.700'
      }    
      rounded="md"
      _hover={{ bg: variant === 'default' ? 'gray.400' : variant === 'base1' ? 'blue.700' : 'gray.500'}} 
      {...rest}
    >
      <HStack justifyContent="space-between" alignItems="center">
        {icon}
        <Text color={variant === 'default' ? 'gray.700' : 'white'} fontFamily="heading" fontSize="sm">
          {title}
        </Text>
      </HStack>
      
    </ButtonChakraBase>
  );
}
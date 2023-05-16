import { Button as ButtonChakraBase, Text} from "@chakra-ui/react";

type Props = {
  title: string;
  variant?: 'default' | 'base1' | 'base2';
  icon?: JSX.Element;
  size?: 'total' | 'half' 
  onClick(): void;
//   isLoading(): void;
}

export function ButtonDefault({ title, icon, variant = 'default', size = 'half',...rest }: Props) {
  return (
    <ButtonChakraBase        
        w={size === "half" ? '50%' : 'full'}
        h={size === "half" ? '10' : '12'}           
        
        bg={variant === 'default' ? 'gray.300' :  
            variant === 'base1' ? 'blue.500' : 'gray.700'
        }    

        borderColor="blue.500"
        rounded="md"

        _hover={{
            bg: variant === 'default' ? 'gray.400' :  
            variant === 'base1' ? 'blue.700' : 'gray.500'
            }
        }
        
        {...rest}
    >
        {icon}
        
        <Text 
            color={variant === 'default' ? 'gray.700' : 'white'}
            fontFamily="heading"
            fontSize="sm"
        >
            {title}
        </Text>
      
    </ButtonChakraBase>
  );
}
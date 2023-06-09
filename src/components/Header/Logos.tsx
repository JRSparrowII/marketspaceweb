import { Text, Image} from '@chakra-ui/react'

export function Logo(){
    return (
        <>
            <Image
              src="images/logo.svg"
              width={20}
              height={20}
              alt=""
            />

            <Text
            fontSize={["2xl", "3xl"]}
            fontWeight="bold"
            letterSpacing="tight"
            width="64"
            color="blue.700"
        >
            marketspace
        </Text>
        </>
        
    );
}
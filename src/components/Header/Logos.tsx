import { Text} from '@chakra-ui/react'

export function Logo(){
    return (
        <Text
            fontSize={["2xl", "3xl"]} //REPONSIVIDADE DO PROJETO
            fontWeight="bold"
            letterSpacing="tight"
            width="64"
            color="blue.700"
        >
            marketspace
            {/* <Text as="span" ml="1" color="blue.700">.</Text> */}
        </Text>
    );
}
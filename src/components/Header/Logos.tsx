import { Text, Image, HStack } from '@chakra-ui/react'

export function Logo() {
    return (
        <HStack gap={1}>
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
                color="blue.100"
            >
                Marketspace
            </Text>
        </HStack>

    );
}
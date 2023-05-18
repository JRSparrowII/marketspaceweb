import { Center, Image, ImageProps } from "@chakra-ui/react";

import logo from '../assets/logo.svg';

interface LogoProps {
  src?: string;
  rest?: ImageProps
}

export function Logo({ src, ...rest }: LogoProps) {
  return (
    <>
      <Center>
        <Image
          src={src || logo}
          width={"8.75rem"}
          {...rest}
        />
      </Center>
    </>
  )
}

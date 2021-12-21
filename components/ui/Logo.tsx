import { FC } from "react";
import Image from "next/image"
import logo from "../../public/nftsgenerator.svg"
interface LogoProps {
}

const Logo: FC<LogoProps> = () => {
    return <Image src={logo} width="54px" height="54px" />
}

export default Logo;
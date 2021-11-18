import { FC } from "react";
import Link from "next/link";
import routes from "../../constants/routes";


interface LogoProps {
}

const Logo: FC<LogoProps> = () => {
    return <Link href={routes.ABSOLUTE}>
        <h1 className={`font-bold text-2xl cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500`}>Art Generator</h1>
    </Link>
}

export default Logo;
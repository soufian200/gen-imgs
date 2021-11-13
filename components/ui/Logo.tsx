import { FC } from "react";

interface LogoProps {
}

const Logo: FC<LogoProps> = () => {
    return <h1 className={`font-bold text-2xl`}>Art Generator</h1>
}

export default Logo;
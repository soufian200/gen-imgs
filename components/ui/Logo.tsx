import { FC } from "react";
import Link from "next/link";
import routes from "../../constants/routes";
import { useRouter } from "next/router";


interface LogoProps {
}

const Logo: FC<LogoProps> = () => {

    const router = useRouter()
    const path = router.asPath;

    return <Link href={!(path.includes(routes.CONTENT)) ? routes.ABSOLUTE : routes.CONTENT + routes.HOME}>
        <h1 className={`font-bold text-2xl cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500`}>Art Generator</h1>
    </Link>
}

export default Logo;
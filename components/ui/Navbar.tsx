import { FC } from "react";
import Container from "../common/Contianer";
import Logo from "./Logo";

interface NavbarProps {
    styles?: string
}

interface LiProps {
    label: string
}

const Li: FC<LiProps> = ({ label }) => <li>
    <a
        className={`capitalize font-bold mx-6 hover:text-blue-500 transition cursor-pointer `}
    >{label}</a>
</li>

const Navbar: FC<NavbarProps> = ({ styles }) => {

    const LINKS: string[] = ["home", "services", "prices", "about us", "contact us"];

    return <div className={`shadow-md bg-white p-4 fixed z-50 w-full left-0 top-0 h-16 ${styles}`} >
        <Container>
            <div className={`flex justify-between`}>
                <Logo />

                <ul className={`flex items-center`}>
                    {
                        LINKS.map((link, index) => <Li key={index} label={link} />)
                    }
                </ul>
            </div>
        </Container>
    </div>
}

export default Navbar;
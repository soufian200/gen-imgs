import { FC } from "react";
import { AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai";
import Center from "../common/Center";
import Container from "../common/Contianer";
import Action from "./Action";
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

        <div className={`flex justify-between`}>
            <Logo />

            <ul className={`flex items-center`}>
                {
                    LINKS.map((link, index) => <Li key={index} label={link} />)
                }
            </ul>

            {/* If user authenticated */}
            {/* <div className={`flex`}>
                    <Action title='Help' Icon={<AiOutlineQuestionCircle size={25} />} />
                    <Action title='Settings' Icon={<AiOutlineSetting size={25} />} />
                    <div className={`ml-4 hover:bg-gray-100 cursor-pointer rounded-full pr-3`}>
                        <Center>
                            <div className={`h-10 w-10 bg-blue-200 rounded-full`}></div>
                            <h2 className={`capitalize font-bold ml-2`}>soufian lamin</h2>
                        </Center>
                    </div>
                </div> */}

        </div>

    </div>
}

export default Navbar;
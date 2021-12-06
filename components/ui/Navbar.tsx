import { FC, useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import Center from "../common/Center";
import Action from "./Action";
import Logo from "./Logo";
import Loader from "./Loader";
import AppContext from "../../contexts/AppContext";
import { useRouter } from "next/router";
import routes from "../../constants/routes";
/**
 * 
 * Navbar Props
 */
interface NavbarProps {
    styles?: string
}
/**
 * 
 * @param styles  customize navbar
 * 
 */
const Navbar: FC<NavbarProps> = ({ styles }) => {
    // get pathname from router
    const router = useRouter()
    const path = router.asPath
    // get current user if logged in
    const { user, userLoading } = useContext(AppContext)
    // Render Navbar
    return <div className={`shadow-md bg-white p-4 fixed z-50 w-full left-0 top-0 h-16 ${styles ? styles : null}`} >
        <div className={`flex justify-between items-center`}>
            <Logo />
            {!(path.includes(routes.CONTENT)) && NavbarLinks}
            {userLoading
                ? <div>
                    <Loader color="text-black" />
                </div>
                : user
                && <div className={`flex`}>
                    <Action label="Logout" Icon={<AiOutlineLogout size={25} />} />
                    <div className={`ml-4 hover:bg-gray-100 cursor-pointer rounded-full pr-3`}>
                        <Center>
                            <div className={`h-10 w-10 bg-red-400 flex justify-center items-center font-bold text-2xl text-white rounded-full`}>{user.username.slice(0, 1)}</div>
                            <h2 className={`capitalize font-bold ml-2`}>{user.username}</h2>

                        </Center>
                    </div>
                </div>
            }
        </div>
    </div>
}
/**
 * 
 * Navbar Links
 * 
 */
const NavbarLinks = () => {
    // Nav bar links
    const LINKS: string[] = ["home", "services", "prices", "about us", "contact us"];

    return <ul className={`flex items-center`}>
        {LINKS.map((link, index) => <Li key={index} label={link} />)}
    </ul>
}
/**
 * Link Props
 * */
interface LiProps {
    label: string
}
/**
 * 
 * @param label From Link
 * @returns 
 */
const Li: FC<LiProps> = ({ label }) => {
    return <li>
        <a className={`capitalize font-bold mx-6 hover:text-blue-500 transition cursor-pointer `}
        >{label}</a>
    </li>
}
export default Navbar;
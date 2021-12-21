import { useRouter } from "next/dist/client/router";
import { FC } from "react"
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai";
import { BsLayers } from "react-icons/bs";
import { RiFeedbackLine } from "react-icons/ri";
import routes from "../../constants/routes";
import SidebarLink, { SidebarLinkProps } from "./SidebarLink";


interface SidebarProps { }

const Sidebar: FC<SidebarProps> = () => {

    const router = useRouter();

    // side bar links part-1
    const LINKSP1: SidebarLinkProps[] = [

        {
            dirname: "Home",
            Icon: AiOutlineHome,
            path: routes.CONTENT + routes.HOME

        },
        {
            dirname: "Layers",
            Icon: BsLayers,
            path: routes.CONTENT + routes.LAYERS
        },
        {
            dirname: "Setting",
            Icon: AiOutlineSetting,
            path: routes.CONTENT + routes.SETTINGS
        },


    ]

    // side bar links part-2
    const LINKSP2: SidebarLinkProps[] = [
        {
            dirname: "Feedback",
            Icon: RiFeedbackLine,
            path: routes.CONTENT + routes.SETTINGS
        },
        {
            dirname: "Help",
            Icon: AiOutlineQuestionCircle,
            path: routes.CONTENT + routes.HELP
        },
    ]

    return <>
        <div className={` w-2/12 z-20 fixed left-0 top-0 h-screen pt-16 border-r border-gray-300`}>
            <div className={`mt-10`}>
                <ul className={`p-10 pt-4 pl-0 text-gray-800`}>
                    {
                        LINKSP1.map((li, index) => {
                            return <SidebarLink key={index} path={li.path}
                                isActive={router.asPath.includes(li.path)}
                                dirname={li.dirname} Icon={li.Icon} />
                        })
                    }
                </ul>
                <div className={`border border-gray-200 w-full`} />
                <ul className={`p-10 pt-4 pl-0 text-gray-800`}>
                    {
                        LINKSP2.map((li, index) => {
                            return <SidebarLink key={index} path={li.path} isActive={router.asPath == li.path} dirname={li.dirname} Icon={li.Icon} />
                        })
                    }
                </ul>
            </div>
        </div>
    </>
}

export default Sidebar;
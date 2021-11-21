import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import { FC, useContext, useEffect } from "react"
import { AiOutlineFolder, AiOutlinePlus, AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai";
import routes from "../../constants/routes";
import AppContext, { ActionTypes } from "../../contexts/AppContext";
import Center from "../common/Center";
import Action from "./Action";
import Overlay from "./overlay/Overlay";
import SidebarLink, { SidebarLinkProps } from "./SidebarLink";

interface SidebarProps {

}



const Sidebar: FC<SidebarProps> = () => {

    const router = useRouter();
    const { selectedIds, setIsOverlayVisible, setOverlayActionType } = useContext(AppContext);

    const handleOnGenerate = () => {
        setIsOverlayVisible(true)
        setOverlayActionType(ActionTypes.GENERATE)
    }


    // side bar links part-1
    const LINKSP1: SidebarLinkProps[] = [
        {
            dirname: "Layers",
            Icon: AiOutlineFolder,
            path: routes.CONTENT + routes.LAYERS
        },
        {
            dirname: "Images",
            Icon: AiOutlineFolder,
            path: routes.CONTENT + routes.IMAGES

        },
        {
            dirname: "Exported",
            Icon: AiOutlineFolder,
            path: routes.CONTENT + routes.EXPORTED
        },


    ]

    // side bar links part-2
    const LINKSP2: SidebarLinkProps[] = [
        {
            dirname: "Setting",
            Icon: AiOutlineSetting,
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
            <div className={` p-5`}>
                <div
                    onClick={handleOnGenerate}
                    className={`border-2 border-black rounded-lg font-bold py-3 bg-black text-white hover:bg-gray-700 transition  cursor-pointer`}>
                    <Center>
                        <AiOutlinePlus size={30} />
                        <h1 className={`capitalize ml-2`}>Generate</h1>
                    </Center>
                </div>
            </div>

            <ul className={`p-10 pt-4 pl-0 text-gray-800`}>
                {

                    LINKSP1.map((li, index) => {
                        return <SidebarLink key={index} path={li.path} isActive={router.asPath == li.path} dirname={li.dirname} Icon={li.Icon} />
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
    </>
}

export default Sidebar;
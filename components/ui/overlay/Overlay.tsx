import classNames from "classnames";
import { FC, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai"
import AppContext from "../../../contexts/AppContext";
import Center from "../../common/Center"


interface OverlayProps {
    children: React.ReactNode
}

const Overlay: FC<OverlayProps> = ({ children }) => {

    const { isOverlayVisible, setIsOverlayVisible } = useContext(AppContext);

    return <div
        className={classNames(`w-screen h-screen fixed overflow-hidden top-0 
    left-0 bg-gray-800 bg-opacity-80 z-50 transition`, { "hidden": !isOverlayVisible })}>
        <Center styles={`w-full h-full`}>
            <div
                onClick={() => setIsOverlayVisible(false)}
                title="Close" className={`absolute right-20 text-black bg-white hover:text-white hover:bg-gray-800 cursor-pointer p-4 rounded-full top-10`}>
                <AiOutlineClose size={24} />
            </div>
            <div className={`p-2 bg-white rounded-lg`}>

                {children}

            </div>
        </Center>
    </div>
}

export default Overlay;
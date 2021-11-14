import Center from "../common/Center"
import { FC, } from "react";

interface BluredBgProps {
    children: React.ReactNode
}
const BluredBg: FC<BluredBgProps> = ({ children }) => {
    return <div className={`w-screen h-screen overflow-hidden`}>
        {/* <Image className={`w-full h-full filter blur-xl`} src={bg} /> */}
        <div className={`w-full h-full filter blur bg-gradient-to-tr from-green-100  to-blue-100`}></div>
        <Center styles={`w-screen h-screen absolute top-0 left-0`}>
            <div className={`flex flex-col`}>
                <div className={`p-10 bg-white bg-opacity-80 shadow-lg `}>
                    {children}
                </div>
            </div>
        </Center >
    </div >
}

export default BluredBg;
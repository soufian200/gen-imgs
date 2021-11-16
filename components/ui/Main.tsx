import { FC } from "react"
import Action from "./Action";
import ActionsBar from "./ActionsBar";

import { BsGrid, BsGrid3X3, BsArrowDown, BsArrowUp } from 'react-icons/bs'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface MainProps {
    children?: React.ReactNode
}

const Main: FC<MainProps> = ({ children }) => {
    return <div className={`w-full flex relative pt-5 p-10`}>

        <Navbar styles={`shadow-none border-b border-gray-300`} />
        <Sidebar />

        <div className={` w-10/12 ml-auto pt-32 relative`}>

            <ActionsBar />

            <div className={`flex justify-between items-center text-gray-600 text-sm`}>
                <div>
                    <h3 className={`capitalize`}>results ( 2000 )</h3>
                </div>
                <div className={`flex items-center`}>

                    <Action foc={true} Icon={<BsGrid3X3 size={22} title="Large Display" />} />
                    <Action Icon={<BsGrid size={22} title="Small Display" />} />
                    {!true
                        ? <Action Icon={<BsArrowUp size={20} title="Reverse" />} />
                        : <Action Icon={<BsArrowDown size={20} title="Reverse" />} />
                    }
                </div>
            </div>


            {children}
        </div>
    </div>
}

export default Main;
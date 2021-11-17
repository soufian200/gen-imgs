import { FC, useContext } from "react"
import Action from "./Action";
import ActionsBar from "./ActionsBar";
import { BsGrid, BsGrid3X3, BsArrowDown, BsArrowUp } from 'react-icons/bs'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AppContext from "../../contexts/AppContext";
import { MdFilterNone } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";

interface MainProps {
    children?: React.ReactNode
}

const VertSep = () => <span className={`mx-4`}>|</span>

const Main: FC<MainProps> = ({ children }) => {


    /**
     * Get Values From AppContext
     * */
    const {
        display,
        setDisplay,
        isReversed,
        setIsReversed,
        selectedFoldersIds,
        setSelectedFoldersIds,
        toSelect
    } = useContext(AppContext)


    // Reset Selected Folders Ids
    const handleSelectNone = () => setSelectedFoldersIds([])



    const handleSelectAll = () => setSelectedFoldersIds(toSelect);











    return <div className={`w-full flex relative pt-5 p-10`}>

        <Navbar styles={`shadow-none border-b border-gray-300`} />
        <Sidebar />

        <div className={` w-10/12 ml-auto pt-32 relative`}>

            <ActionsBar />

            <div className={`flex justify-between items-center text-gray-600 text-sm`}>
                <div className={`flex items-center`}>
                    <h3 className={`capitalize`}>results ( 2000 )</h3>

                    {selectedFoldersIds.length > 0 && <>
                        <VertSep />
                        < h3 className={`text-black mr-2`}>{selectedFoldersIds.length} Selected</h3>
                        <Action
                            onClick={handleSelectNone}
                            Icon={<MdFilterNone size={19} />}
                            label="Select None"
                        />

                        <Action
                            onClick={handleSelectAll}
                            Icon={<BiSelectMultiple size={22} />}
                            label="Select All"
                            disabled={toSelect.length === selectedFoldersIds.length}
                        />
                    </>
                    }
                </div>
                <div className={`flex items-center`}>

                    <Action
                        onClick={() => setDisplay("Large")}
                        foc={display === "Large"}
                        Icon={<BsGrid size={22} />}
                        title="Small Display"
                    />
                    <Action
                        onClick={() => setDisplay("Small")}
                        foc={display === "Small"}
                        Icon={<BsGrid3X3 size={22} />}
                        title="Large Display"
                    />
                    <Action
                        onClick={() => setIsReversed(!isReversed)}
                        foc={isReversed}
                        title="Reverse"
                        Icon={isReversed
                            ? <BsArrowUp size={20} />
                            : <BsArrowDown size={20} />}
                    />

                </div>
            </div>
            {children}
        </div>
    </div >
}

export default Main;
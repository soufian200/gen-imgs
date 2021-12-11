import { useContext } from "react"
import Action from "./Action";
import { BsGrid, BsGrid3X3, BsArrowDown, BsArrowUp } from 'react-icons/bs'
import AppContext, { DisplayState } from "../../contexts/AppContext";
import { MdFilterNone } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";
/**
 * 
 * Vertical Seperator
 * */
const VertSep = () => <span className={`mx-4`}>|</span>
/**
 *
 * Result Bar
 * */
function ResultBar() {
    /**
     * 
     * Get Values From AppContext
     * */
    const {
        display,
        setDisplay,
        isReversed,
        setIsReversed,
        selectedIds,
        setSelectedIds,
        setFolders,
        folders,
        itemsIds,
    } = useContext(AppContext)
    // Reset Selected Folders Ids (Select None)
    const handleSelectNone = () => setSelectedIds([])
    // Select All
    const handleSelectAll = () => setSelectedIds(itemsIds);
    // Handle Reverse
    const handleReverse = () => {
        setFolders(folders.reverse())
        setIsReversed(!isReversed)
    }
    return <div className={`flex justify-between items-center text-gray-600 text-sm`}>
        <div className={`flex items-center`}>
            <h3 className={`capitalize`}>results {folders.length > 0 && `( ${folders.length} )`}</h3>
            {selectedIds.length > 0 && <>
                <VertSep />
                < h3 className={`text-black mr-2`}>{selectedIds.length} Selected</h3>
                <Action
                    onClick={handleSelectNone}
                    Icon={<MdFilterNone size={19} />}
                    label="Select None"
                />
                <Action
                    onClick={handleSelectAll}
                    Icon={<BiSelectMultiple size={22} />}
                    label="Select All"
                    disabled={itemsIds.length === selectedIds.length}
                />
            </>
            }
        </div>
        <div className={`flex items-center`}>

            <Action
                onClick={() => setDisplay(DisplayState.Large)}
                foc={display === DisplayState.Large}
                Icon={<BsGrid size={22} />}
                title="Small Display"
            />
            <Action
                onClick={() => setDisplay(DisplayState.SMALL)}
                foc={display === DisplayState.SMALL}
                Icon={<BsGrid3X3 size={22} />}
                title="Large Display"
            />
            <Action
                onClick={handleReverse}
                foc={isReversed}
                title="Reverse"
                Icon={isReversed
                    ? <BsArrowUp size={20} />
                    : <BsArrowDown size={20} />}
            />
        </div>
    </div>
}
export default ResultBar;
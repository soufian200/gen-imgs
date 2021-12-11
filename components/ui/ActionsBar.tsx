import Action from "./Action";
import AppContext, { ActionTypes } from "../../contexts/AppContext";
import { AiOutlineCloudUpload, AiOutlineFolderAdd } from "react-icons/ai";
import { BsTrash, } from 'react-icons/bs'
import { BiEdit } from "react-icons/bi";
import { useContext } from "react";
/**
 * 
 * Actions Bar Component
 */
const ActionsBar = () => {

    const { selectedIds, setIsOverlayVisible, setOverlayActionType } = useContext(AppContext);
    const isEmpty = (_selectedIds: string[]): boolean => _selectedIds.length === 0;
    /**
     * Render Component Depends On Action Type 
     * @param type 
     */
    const handleAction = (type: ActionTypes) => {
        /** Show Overlay */
        setIsOverlayVisible(true)
        /** Set Type Action */
        setOverlayActionType(type)
    }
    return <>
        <div className={`flex justify-between items-center border-b top-16 right-0 h-16 w-10/12 bg-white bg-opacity-90 p-2 fixed z-30`}>
            <div className="flex text-gray-800">
                <div className={`relative overflow-hidden cursor-pointer hover:bg-gray-100 rounded-md `}>
                    <input
                        type="file"
                        title="Upload Layers"
                        accept="image/*"
                        multiple
                        className={`absolute cursor-pointer top-0 left-0 bg-red-400 h-full w-full opacity-0 `}
                    />
                    <Action
                        Icon={<AiOutlineCloudUpload size={25} />}
                        label="Upload Layers"
                    />
                </div>
                <Action
                    Icon={<AiOutlineFolderAdd size={25} />}
                    label="New Folder"
                    onClick={() => handleAction(ActionTypes.NEWFOLDER)}
                />
                {!isEmpty(selectedIds)
                    && <Action
                        onClick={() => handleAction(ActionTypes.EDIT)}
                        Icon={<BiEdit size={24} />}
                        label="Rename"
                        disabled={selectedIds.length != 1}
                    />
                }
                {!isEmpty(selectedIds) && <Action
                    onClick={() => handleAction(ActionTypes.DELETE)}
                    Icon={<BsTrash size={21} />}
                    label="Delete"
                />}
            </div>
        </div>
    </>
}
export default ActionsBar;
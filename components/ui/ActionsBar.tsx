import Action from "./Action";
import AppContext, { ActionTypes } from "../../contexts/AppContext";
import { AiOutlineCloudUpload, AiOutlineFolderAdd } from "react-icons/ai";
import { BsArrowLeft, BsTrash, } from 'react-icons/bs'
import { BiEdit } from "react-icons/bi";
import { useContext } from "react";
import routes from "../../constants/routes";
import router, { useRouter } from "next/router";
/**
 * 
 * Actions Bar Component
 */
const ActionsBar = () => {

    const { selectedIds, setIsOverlayVisible, setOverlayActionType, setFiles } = useContext(AppContext);
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
    /**
    * Render Component Depends On Action Type 
    * @param event 
    */
    const handleUploadLayers = (e: React.FormEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (!files) return
        /** Set Action To UploadLayers (used to decide which ui to render) */
        handleAction(ActionTypes.UPLOADLAYERS)
        setFiles(Array.from(files))
    }
    const { asPath, query } = useRouter();
    const layerPath = routes.CONTENT + routes.LAYERS;
    return <>
        <div className={`flex items-center border-b top-16 right-0 h-16 w-10/12 bg-white bg-opacity-90 p-2 fixed z-30`}>
            <div onClick={router.back} title="Go Back"
                className={`w-10 h-10 hover:bg-gray-100 transition cursor-pointer rounded-full flex justify-center items-center mr-6`}>
                <BsArrowLeft size={20} />
            </div>
            <div className="flex text-gray-800">
                <div className={`relative overflow-hidden cursor-pointer hover:bg-gray-100 rounded-md `}>
                    <input
                        disabled={query.layerId ? false : true}
                        type="file"
                        title="Upload Layers"
                        accept="image/*"
                        multiple
                        className={`absolute cursor-pointer top-0 left-0 bg-red-400 h-full w-full opacity-0 `}
                        onChange={handleUploadLayers}
                    />
                    <Action
                        Icon={<AiOutlineCloudUpload size={25} />}
                        label="Upload Layers"
                    />
                </div>
                <Action
                    disabled={layerPath !== asPath}
                    Icon={<AiOutlineFolderAdd size={25} />}
                    label="New Folder"
                    onClick={() => handleAction(ActionTypes.NEWFOLDER)}
                />
                {!isEmpty(selectedIds) && <Action
                    onClick={() => handleAction(ActionTypes.DELETE)}
                    Icon={<BsTrash size={21} />}
                    label="Delete"
                />}
                {!isEmpty(selectedIds)
                    && <Action
                        onClick={() => handleAction(ActionTypes.EDIT)}
                        Icon={<BiEdit size={24} />}
                        label="Rename"
                        disabled={selectedIds.length != 1}
                    />
                }
            </div>
        </div>
    </>
}
export default ActionsBar;
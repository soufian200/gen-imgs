import Action from "./Action";
import { AiOutlineCloudUpload, AiOutlineFolderAdd } from "react-icons/ai";
import { BsTrash, } from 'react-icons/bs'
import { BiEdit, BiExport, BiRightArrow } from "react-icons/bi";
import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import routes from "../../constants/routes";
import Overlay from "./overlay/Overlay";
import EditItem from "./overlay/EditItem"
import DeleteItem from "./overlay/DeleteItem";


enum ActionTypes {
    EDIT = "EDIT",
    DELETE = "DELETE",
}

const ActionsBar = () => {

    const [actionType, setActionType] = useState<ActionTypes>()

    const { asPath } = useRouter();

    const getRoutes = (pathname: string): string[] => pathname.substr(2).split('/').slice(1,)
    const ROUTES = getRoutes(asPath);

    const isEmpty = (_selectedIds: string[]): boolean => _selectedIds.length === 0;


    const { selectedIds, setIsOverlayVisible } = useContext(AppContext);

    const handleAction = (type: ActionTypes) => {
        setIsOverlayVisible(true)
        setActionType(type)
    }

    return <>
        <Overlay>
            {actionType == ActionTypes.EDIT && <EditItem />}
            {actionType == ActionTypes.DELETE && <DeleteItem />}
        </Overlay>
        <div className={`flex justify-between items-center border-b top-16 right-0 h-16 w-10/12 bg-white bg-opacity-90 p-2 fixed `}>

            <ul className={`flex text-gray-800`}>
                {
                    ROUTES.map((r, i) => {


                        return <div key={i} className={`flex items-center`}>
                            <li key={i} className={`cursor-pointer hover:bg-gray-100 rounded-md text-xl capitalize py-2 px-4`}>{r}</li>
                            {i != ROUTES.length - 1 && <BiRightArrow className={`ml-2`} />}
                        </div>

                    })
                }
            </ul>
            <div className="flex text-gray-800">

                {!isEmpty(selectedIds)
                    // asPath == routes.CONTENT + routes.LAYERS && 
                    && <Action
                        onClick={() => handleAction(ActionTypes.EDIT)}
                        Icon={<BiEdit size={24} />}
                        label="Edit"
                        disabled={selectedIds.length != 1}
                    />
                }

                {!isEmpty(selectedIds) && <Action
                    onClick={() => handleAction(ActionTypes.DELETE)}
                    Icon={<BsTrash size={21} />}
                    label="Delete"
                />}
                <Action Icon={<BiExport size={24} />} label="Export" />

                <Action Icon={<AiOutlineCloudUpload size={25} />} label="Upload Files" />
                <Action Icon={<AiOutlineFolderAdd size={25} />} label="New Folder" />

            </div>
        </div>
    </>
}

export default ActionsBar;
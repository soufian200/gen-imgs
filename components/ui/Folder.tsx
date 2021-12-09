import classNames from "classnames"
import { FC, MouseEventHandler, useContext } from "react"
import { AiFillFolder } from "react-icons/ai"
import AppContext from "../../contexts/AppContext"
import AssetContainer from "./AssetContainer"


export interface FolderProps {
    id: string;
    folderName: string;
    createdAt: number;
    imgs?: any[]
}

const Folder: FC<FolderProps> = ({ id, folderName, createdAt, }) => {

    const { display } = useContext(AppContext)

    return <AssetContainer id={id} title={folderName} createdAt={createdAt} >
        <div className={`text-blue-400`}>
            <AiFillFolder size={display === "Large" ? 200 : 130} />
        </div>
    </AssetContainer>
}

export default Folder;
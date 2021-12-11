import { FC, useContext } from "react"
import { AiFillFolder } from "react-icons/ai"
import AppContext from "../../contexts/AppContext"
import AssetContainer from "./AssetContainer"

/**
 * 
 * Interface For Folder Props
 */
export interface FolderProps {
    id: string;
    folderName: string;
    createdAt: number;
    imgs?: any[]
}
/**
 * 
 * Folder | Layer
 */
const Folder: FC<FolderProps> = ({ id, folderName, createdAt, }) => {
    /** Size Of Asset (Large|Small) */
    const { display } = useContext(AppContext)
    /** Render */
    return <AssetContainer id={id} title={folderName} createdAt={createdAt} >
        <div className={`text-blue-400`}>
            <AiFillFolder size={display === "Large" ? 200 : 130} />
        </div>
    </AssetContainer>
}
export default Folder;
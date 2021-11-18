import classNames from "classnames"
import { FC, MouseEventHandler, useContext } from "react"
import { AiFillFolder } from "react-icons/ai"
import AppContext from "../../contexts/AppContext"
import AssetContainer, { AssetProps } from "./AssetContainer"


const Folder: FC<AssetProps> = ({ id, title, createdAt, }) => {

    const { display } = useContext(AppContext)

    return <AssetContainer id={id} title={title} createdAt={createdAt} >
        <div className={`text-blue-400`}>
            <AiFillFolder size={display === "Large" ? 200 : 130} />
        </div>
    </AssetContainer>
}

export default Folder;
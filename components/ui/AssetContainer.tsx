import classNames from "classnames"
import { FC, MouseEventHandler, useContext } from "react"
import AppContext from "../../contexts/AppContext"


export interface AssetProps {
    id: string
    title: string | number
    createdAt: string
}
interface AssetContainerProps extends AssetProps {
    children: React.ReactNode
}


const AssetContainer: FC<AssetContainerProps> = ({ children, id, title, createdAt, }) => {

    const { setSelectedFoldersIds, selectedFoldersIds } = useContext(AppContext)

    /**
     * When user try to select a folder
     * */
    const handleSelectFolder = (id: string) => {

        // check if id exists remove it (deselect)
        if (selectedFoldersIds.includes(id)) {

            const filteredIds = selectedFoldersIds.filter(i => i !== id)
            setSelectedFoldersIds(filteredIds)
            return;
        }

        // else add it to Selected Folders Ids (select)
        setSelectedFoldersIds([...selectedFoldersIds, id])
    }


    const rootStyle = `mr-4 
    mt-4
    border
    p-4 
    rounded-lg 
    hover:shadow-lg 
    cursor-pointer 
    transition duration-300
    `;


    return <div
        onClick={() => handleSelectFolder(id)}
        className={classNames(rootStyle, { "bg-blue-100 border-blue-300": selectedFoldersIds.includes(id) })
        }
    >
        {/* <div className={`text-blue-400`}>
            <AiFillFolder size={200} />
        </div> */}
        {/* <div className={classNames(`bg-gray-200 w-36 h-40 rounded-lg overflow-hidden `, { "h-160 w-160": display == "Small" }, { "h-260 w-260": display == "Large" })} ></div> */}

        {children}
        <h1 className={`mt-3`}># {title}</h1>
        <p className={`text-xs text-gray-400 capitalize`}>{createdAt}</p>
    </div>
}

export default AssetContainer;
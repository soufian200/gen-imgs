import classNames from "classnames"
import { FC, useContext } from "react"
import AppContext from "../../contexts/AppContext"
import { useRouter } from 'next/router'
import formatCreatedAt from "../../lib/utils/formatCreatedAt"
/**
 * 
 * Interface For Asset Props
 */
export interface AssetProps {
    id: string
    title: string
    createdAt: number
}
/**
 * 
 * Intreface For Asset Container Props
 */
interface AssetContainerProps extends AssetProps {
    children: React.ReactNode
}
/**
 * 
 * Asset Container
 * 
 */
const AssetContainer: FC<AssetContainerProps> = ({ children, id, title, createdAt, }) => {
    const router = useRouter()
    const { setSelectedIds, selectedIds, setItemsIds } = useContext(AppContext)
    /**
     * 
     * Select | Deselect A Folder
     * @param id
     * */
    const handleSelectFolder = (id: string) => {
        // check if id exists remove it (deselect)
        if (selectedIds.includes(id)) {
            const filteredIds = selectedIds.filter(i => i !== id)
            setSelectedIds(filteredIds)
            return;
        }
        // else add it to Selected Folders Ids (select)
        setSelectedIds([...selectedIds, id])
    }
    /**
     * When user try to open a folder
     * */

    const handleOpenFolder = (id: string) => {
        // console.log("open folder with this id: ", router.asPath + '/' + id)
        setSelectedIds([])
        setItemsIds([])
        router.push(router.asPath + '/' + id)
    }
    const rootStyle = `mr-4 
    mt-4
    border
    p-4 
    rounded-lg 
    hover:shadow-lg 
    cursor-pointer 
    transition duration-300
    select-none
    `;
    return <div
        onDoubleClick={() => handleOpenFolder(id)}
        onClick={() => handleSelectFolder(id)}
        className={classNames(rootStyle, { "bg-blue-100 border-blue-300": selectedIds.includes(id) })
        }
    >
        {children}
        <h1 className={`mt-3 capitalize`}> {title}</h1>
        <p className={`text-xs text-gray-400 capitalize`}>{formatCreatedAt(createdAt)}</p>
    </div>
}

export default AssetContainer;
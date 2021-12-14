import { FC, useContext } from "react"
import ActionsBar from "./ActionsBar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AppContext, { ActionTypes } from "../../contexts/AppContext";
import Overlay from "./overlay/Overlay";
import EditItem from "./overlay/EditItem";
import NewFolder from "./overlay/NewFolder";
import DeleteItem from "./overlay/DeleteItem";
import { useRouter } from "next/router";
import routes from "../../constants/routes";
import ResultBar from "./ResultBar";
import UploadLayers from "./overlay/UploadLayers";
/**
 * 
 * interface For Main Layout Props
 */
interface MainProps {
    children?: React.ReactNode
}
/**
 * 
 * Main Layout
 * @param children
 */
const Main: FC<MainProps> = ({ children }) => {
    // Get pathname
    const { asPath } = useRouter()
    /**
     * 
     * Get Values From AppContext
     * */
    const { overlayActionType } = useContext(AppContext)

    // Render
    return <div className={`w-full flex relative pt-5 p-10 `}>
        <Navbar styles={`shadow-none border-b border-gray-300`} />
        <Sidebar />

        <Overlay>
            {overlayActionType == ActionTypes.EDIT && <EditItem />}
            {overlayActionType == ActionTypes.NEWFOLDER && <NewFolder />}
            {overlayActionType == ActionTypes.DELETE && <DeleteItem />}
            {overlayActionType == ActionTypes.UPLOADLAYERS && <UploadLayers />}
        </Overlay>
        <div className={` w-10/12 ml-auto pt-32 relative`}>
            <ActionsBar />
            {asPath.includes(routes.CONTENT + routes.LAYERS) && <ResultBar />}
            {children}
        </div>
    </div >
}
export default Main;
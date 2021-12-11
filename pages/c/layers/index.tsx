
import Main from "../../../components/ui/Main";
import { useContext, useEffect, useState } from 'react';
import AppContext from "../../../contexts/AppContext";
import Folder, { FolderProps } from "../../../components/ui/Folder";
import axios from "axios";
import FailedOperation from "../../../components/ui/FailedOperation";
import Empty from "../../../components/ui/Empty";
import routes from "../../../constants/routes";
/**
 * 
 * Layers Page
 */
const Layers = () => {
    /** Request Laoding */
    const [loading, setLoading] = useState(true)
    /** Unexpected Error */
    const [error, setError] = useState('')
    const { setSelectedIds, folders, setFolders, setItemsIds, } = useContext(AppContext);
    /**
     * 
     * Fetch Layers Of  Current User With Its Images
     */
    const fetchLayers = async () => {
        /** Fetch at first load */
        if (folders.length !== 0) {
            setLoading(false)
            return
        };
        try {
            /** Get Result */
            const res = await axios.get(routes.CONTENT + routes.LAYERS);
            /** Get Payload Witch is array of layers */
            const { payload } = res.data.data;
            const layers: FolderProps[] = payload.layers;
            /** Hide Loader */
            setLoading(false)
            /** Set Layers In Context */
            setFolders(layers)
            /** 
            * Items to be select in layer page 
            * Get IDs Of Layers
            */
            setItemsIds(layers.map(item => item.id));
        } catch (err: any) {
            /** Hide Loader */
            setLoading(false)
            /** Set Unexpected Error */
            setError(err.message)
        }
    }
    useEffect(() => {
        /** Fetch Layers Of  Current User */
        fetchLayers()
        /** Reset selected ids */
        setSelectedIds([])
    }, [])
    /** Render Layers Page */
    return <Main>
        <div className={`flex flex-wrap w-full mb-10 `}>
            {loading && folders.length === 0 && <h1>Loading...</h1>}
            {error && <FailedOperation msg={error} />}
            {folders.length === 0 && !loading
                ? <Empty />
                : folders.map(({ id, folderName, createdAt }) => <Folder
                    key={id}
                    id={id}
                    folderName={folderName}
                    createdAt={createdAt}

                />)
            }
        </div>
    </Main >
}
export default Layers;
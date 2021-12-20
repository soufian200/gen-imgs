
import Main from "../../../components/ui/Main";
import { useContext, useEffect, useState } from 'react';
import AppContext from "../../../contexts/AppContext";
import Folder, { FolderProps } from "../../../components/ui/Folder";
import axios, { AxiosError } from "axios";
import FailedOperation from "../../../components/ui/FailedOperation";
import Empty from "../../../components/ui/Empty";
import routes from "../../../constants/routes";
import { useRouter } from "next/router";
/**
 * 
 * Layers Page
 */
const Layers = () => {
    const router = useRouter()
    /** Request Laoding */
    const [loading, setLoading] = useState(true)
    /** Unexpected Error */
    const [error, setError] = useState('')
    const { setSelectedIds, folders, setFolders, setItemsIds, } = useContext(AppContext);

    useEffect(() => {

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
                if ((err as AxiosError).response?.status === 401) {
                    router.push(routes.LOGIN)
                }
                /** Hide Loader */
                setLoading(false)
                /** Set Unexpected Error */
                setError(err.response.data.error.message)
            }
        }
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
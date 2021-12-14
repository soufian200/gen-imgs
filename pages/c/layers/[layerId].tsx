import { useContext, useEffect, useState } from "react";
import Main from "../../../components/ui/Main"
import { useRouter } from 'next/router'
import AppContext from "../../../contexts/AppContext";
import Asset from "../../../components/ui/Asset";
import getItemsIds from "../../../lib/getItemsIds";
import { ImgInterface } from "../../../utils/interfaces";
import axios, { AxiosError } from "axios";
import routes from "../../../constants/routes";
import FailedOperation from "../../../components/ui/FailedOperation";
import Empty from "../../../components/ui/Empty";


const FolderDetail = () => {

    const router = useRouter()
    const { setItemsIds, setSelectedIds, setImgs, imgs } = useContext(AppContext);
    const [traits, setTraits] = useState<ImgInterface[]>([]);
    const [error, setError] = useState('')
    const [imgsLoading, setImgsLoading] = useState(true)
    /**
     * 
     * Fetch Imgs of current layer
     */
    const getImgsOfLayer = async () => {
        // console.log(router)
        const layerId: any = router.query.layerId;
        // Get imgs from local
        const localImgs: any = imgs[layerId];
        if (localImgs) {
            setImgsLoading(false)
            if (localImgs) setTraits(localImgs)
            return
        }
        try {
            setError('')

            const values = { layerId }
            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.IMGS, values)
            const { payload } = await res.data.data

            setTraits(payload.imgs)
            setImgsLoading(false)
            let tempobj: any = {};
            tempobj[payload.layerId] = payload.imgs;
            setImgs({ ...imgs, ...tempobj })
        } catch (err) {
            setImgsLoading(false)
            /** Set Unexpected Error */
            setError((err as AxiosError).response?.data.error.message)
        }
    }

    useEffect(() => {
        // items to be select in layer page
        const ids = getItemsIds(traits);
        setItemsIds(ids)
        // reset selected ids
        setSelectedIds([])
    }, [imgsLoading])

    useEffect(() => {
        if (!router.isReady) return;
        getImgsOfLayer()
    }, [router.isReady]);


    return <Main>
        <div className={`flex flex-wrap w-full`}>
            {!imgsLoading && error && <FailedOperation msg={error} />}
            {imgsLoading
                ? <h1>imgs Loading...</h1>
                : traits.length > 0
                    ? traits.map((item, index) => <Asset
                        key={item.id}
                        id={item.id || 'id'}
                        title={item.filename}
                        createdAt={1222}
                        path={item.path || 'pth'}

                    />)
                    : <Empty />
            }
        </div>
    </Main>
}
export default FolderDetail;
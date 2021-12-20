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
    const { layerId }: any = router.query

    const { setItemsIds, setSelectedIds, setImgs, imgs } = useContext(AppContext);
    const [error, setError] = useState('')
    const [imgsLoading, setImgsLoading] = useState(true)


    useEffect(() => {
        if (!imgs[layerId]) return
        // items to be select in layer page
        const ids = getItemsIds(imgs[layerId]);
        setItemsIds(ids)
        // reset selected ids
        setSelectedIds([])
    }, [imgsLoading, imgs])

    useEffect(() => {
        if (!router.isReady) return;
        /**
        * 
        * Fetch Imgs of current layer
        */
        const getImgsOfLayer = async () => {
            // console.log(router)

            if (Object.keys(imgs).includes(layerId)) {
                setImgsLoading(false)
                return
            };
            try {
                setError('')

                const values = { layerId }
                const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.IMGS, values)
                const { payload } = await res.data.data

                // setTraits(payload.imgs)
                setImgsLoading(false)
                let tempobj: any = {};
                tempobj[payload.layerId] = payload.imgs;
                setImgs({ ...imgs, ...tempobj })
                // console.log('imgs: ', { ...imgs, ...tempobj })
            } catch (err) {
                setImgsLoading(false)
                /** Set Unexpected Error */
                setError((err as AxiosError).response?.data.error.message)
            }
        }
        getImgsOfLayer()
    }, [router.isReady]);

    return <Main>
        <div className={`flex flex-wrap w-full`}>
            {!imgsLoading && error && <FailedOperation msg={error} />}
            {imgsLoading || !layerId
                ? <h1>imgs Loading...</h1>
                : imgs[layerId] && imgs[layerId].length > 0
                    ? imgs[layerId].map((item, index) => <Asset
                        key={item.id}
                        id={item.id}
                        title={item.filename}
                        createdAt={item.createdAt}
                        path={item.path}
                    />)
                    : <Empty />
            }
        </div>
    </Main>
}
export default FolderDetail;
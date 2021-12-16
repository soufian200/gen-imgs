import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import routes from "../../../constants/routes"
import AppContext from "../../../contexts/AppContext"
import { ImgInterface } from "../../../utils/interfaces"
import Button from "../Button"
import Error from "../Error"
/**
 * 
 * Delete One Layer Or More
 */
const DeleteItem = () => {
    const { asPath, query } = useRouter();
    const { setIsOverlayVisible, setSelectedIds, selectedIds, folders, setFolders, setImgs, imgs } = useContext(AppContext)
    /** Processing Request */
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    const layerPath = routes.CONTENT + routes.LAYERS;


    const handleDeleteLayer = async () => {
        // Try To Post Data
        try {
            setError('')
            /** Show Loader */
            setLoading(true)
            /** Post Data To Reset Password Api & Get Response */
            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.DELETE, { layerIds: selectedIds })
            console.log(res.data)
            /** Hide loader */
            setLoading(false)

            /** Rename Local Folder */
            const newFolders = folders.filter(i => !selectedIds.includes(i.id))
            setFolders(newFolders)
            /** Hide OverLay */
            setIsOverlayVisible(false)
            /** Reset Selected IDs */
            setSelectedIds([])
        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            // Hide Loader
            setLoading(false)
        }
    }
    const handleDeleteImg = async () => {

        const { layerId }: any = query

        // Try To Post Data
        try {
            setError('')
            /** Show Loader */
            setLoading(true)
            /** Post Data To Reset Password Api & Get Response */
            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.IMGS + routes.DELETE,
                { layerId, imgsIds: selectedIds })
            console.log(res.data)
            /** Hide loader */
            setLoading(false)

            /** Remove Local Imgs Of Layer */
            const filteredImgs = imgs[layerId].filter((img: ImgInterface) => !selectedIds.includes(img.id as string))

            imgs[layerId] = filteredImgs

            /** Hide OverLay */
            setIsOverlayVisible(false)
            /** Reset Selected IDs */
            setSelectedIds([])
        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            // Hide Loader
            setLoading(false)
        }
    }


    return <div >
        <h1 className={`text-lg mb-5 font-bold`}>Delete</h1>
        <div>
            {error
                ? <Error error={error} />
                :
                <div>
                    <h1 className={`my-10`}> <span className={`text-red-500 `}>
                        {selectedIds.length}
                    </span>  items will be removed. Are you sure ?</h1>

                    <div className={`mt-5 flex items-center`}>
                        <Button
                            onClick={() => setIsOverlayVisible(false)}
                            label="No"
                            styles={`bg-gray-200 hover:bg-gray-300 text-black px-16 py-4 rounded-lg mr-1`}
                        />
                        <Button
                            onClick={asPath === layerPath ? handleDeleteLayer : handleDeleteImg}
                            loading={loading}
                            label="Yes"
                            styles={`bg-blue-400 hover:bg-blue-300 px-16 py-4 rounded-lg text-white ml-1`}
                        />
                    </div>
                </div>}
        </div>
    </div>
}

export default DeleteItem;
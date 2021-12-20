import { Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../../contexts/AppContext"
import Button from "../Button"
import AuthInput from "../form/AuthInput"
import * as Yup from 'yup';
import routes from "../../../constants/routes"
import axios, { AxiosError } from "axios"
import Error from "../Error"
import { useRouter } from "next/router"
/**
 * 
 * Formik Values
 * */
interface Values {
    renameVal: string;
}

/**
 * 
 * @returns 
 */
const NewFolderSchema = Yup.object().shape({
    renameVal: Yup.string().required('Required'),
});
/**
 * 
 * Add New Layer (Folder)
 */
const EditItem = () => {

    const { asPath, query } = useRouter();
    const layerPath = routes.CONTENT + routes.LAYERS;
    const { setIsOverlayVisible, selectedIds, setFolders, folders, setSelectedIds, imgs, setImgs } = useContext(AppContext)
    /** Select The First Selected Item Either Layer Or Img */
    const firstSelected = selectedIds[0];
    const [crrValue, setCrrValue] = useState('')
    // Coming Error
    const [error, setError] = useState<string>('')
    /** Processing Request */
    const [loading, setLoading] = useState(false)
    /**
     * Rename Layer
     * @param values 
     */
    const renameLayer = async (values: Values) => {
        const { renameVal } = values
        // Try To Post Data
        try {
            /** Reset Error */
            setError('')
            /** Show Loader */
            setLoading(true)
            /** Post Data To Reset Password Api & Get Response */
            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.RENAME, { layerId: firstSelected, layerName: renameVal })
            // console.log(res.data)
            /** Hide loader */
            setLoading(false)
            /** Rename Local Folder */
            const newFolders = folders.map(folder => folder.id === firstSelected ? { ...folder, folderName: renameVal } : folder)
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
    /**
     * Rename Img Of A Layer
     * @param values 
     */
    const renameImg = async (values: Values) => {
        const { renameVal } = values;
        const layerId = query.layerId;
        const vals = { newImgName: renameVal, imgId: firstSelected, layerId }
        // console.log('rename img:', vals)
        try {
            // /** Reset Error */
            setError('')
            // /** Show Loader */
            setLoading(true)
            // /** Post Data To Reset Password Api & Get Response */
            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.IMGS + routes.RENAME, vals)
            // console.log(res.data)
            // /** Hide loader */
            setLoading(false)
            /** Update Local Imgs */
            const currentImgs = imgs[layerId as string]
            let updatedImgs = currentImgs.map(img => img.id === firstSelected ? { ...img, filename: renameVal } : img);
            const newImgs = { ...imgs }
            newImgs[layerId as string] = updatedImgs;
            setImgs(newImgs);
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
    /**
     * 
     * Send Email Input Value To Server
     * @param values 
     */
    const handleOnSubmit = async (values: Values) => {
        if (asPath === layerPath) {
            renameLayer(values)
        } else {
            renameImg(values)
        }
    }

    /** Re-Render Every Time Selected Item Changed */
    useEffect(() => {
        if (asPath === layerPath) {
            let currentFolder = folders.find(folder => folder.id === firstSelected);
            setCrrValue(currentFolder?.folderName || '')
        } else {
            const layerId = query.layerId;
            const currentImgs = imgs[layerId as string]
            let currentImg = currentImgs.find(img => img.id === firstSelected);
            setCrrValue(currentImg?.filename || '')
        }
    }, [selectedIds])

    return <div >
        <h1 className={`text-lg mb-5 font-bold`}>Rename</h1>
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{ renameVal: crrValue }}
                validationSchema={NewFolderSchema}
                onSubmit={handleOnSubmit}
            >
                <Form className={`flex flex-col`}>
                    {error && <Error error={error} />}
                    <AuthInput
                        label="New Folder"
                        placeholder="Enter Folder Name"
                        name="renameVal"
                    />
                    <Button type="submit" loading={loading} label="Create" />
                </Form>
            </Formik>
        </div>
    </div>
}
export default EditItem;
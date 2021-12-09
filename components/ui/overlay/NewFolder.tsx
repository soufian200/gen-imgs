import { Form, Formik } from "formik"
import { useContext, useState } from "react"
import AppContext from "../../../contexts/AppContext"
import Button from "../Button"
import AuthInput from "../form/AuthInput"
import * as Yup from 'yup';
import routes from "../../../constants/routes"
import axios, { AxiosError } from "axios"
import Error from "../Error"
/**
 * 
 * Formik Values
 * */
interface Values {
    layerName: string;
}
/**
 * Initial Values
 * 
 * */
const initialValues = {
    layerName: '',
}
/**
 * 
 * @returns 
 */
const NewFolderSchema = Yup.object().shape({
    layerName: Yup.string().required('Required'),
});
/**
 * 
 * Add New Layer (Folder)
 */
const NewFolder = () => {

    const { setIsOverlayVisible, setFolders, folders, setItemsIds, itemsIds } = useContext(AppContext)
    // Coming Error
    const [error, setError] = useState<string>('')
    /** Processing Request */
    const [loading, setLoading] = useState(false)
    /**
     * 
     * Send Email Input Value To Server
     * @param values 
     */
    const handleOnSubmit = async (values: Values) => {
        // Try To Post Data
        try {
            /** Reset Error */
            setError('')
            /** Show Loader */
            setLoading(true)
            /** Post Data To Reset Password Api & Get Response */
            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.ADDLAYER, values)
            const { payload: newLayer } = await res.data.data
            /** Hide loader */
            setLoading(false)
            /** Hide OverLay */
            setIsOverlayVisible(false)
            setFolders([newLayer, ...folders])
            setItemsIds([...itemsIds, newLayer.id])
        } catch (err) {
            // Set Error If Post Request Wasn't Successful
            setError((err as AxiosError).response?.data.error.message)
            // Hide Loader
            setLoading(false)
        }
    }
    return <div >
        <h1 className={`text-lg mb-5 font-bold`}>Create New Folder</h1>
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={NewFolderSchema}
                onSubmit={handleOnSubmit}
            >
                <Form className={`flex flex-col`}>
                    {error && <Error error={error} />}
                    <AuthInput
                        label="New Folder"
                        placeholder="Enter Folder Name"
                        name="layerName"
                    />
                    <Button type="submit" loading={loading} label="Create" />
                </Form>
            </Formik>
        </div>
    </div>
}
export default NewFolder;
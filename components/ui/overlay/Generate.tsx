
import { FC, useContext, useState } from "react";
import { Formik, Field, Form, FormikHelpers, useField } from 'formik';
import * as Yup from 'yup'
import { saveAs } from 'file-saver'
import JSZip from "jszip";
import axios from "axios";
import AppContext from "../../../contexts/AppContext";
import Button from "../Button";
import Loader from "../Loader";
import Center from "../../common/Center";
import InputFormik from "../form/InputFormik";
import { LayerInterface } from "../../../utils/interfaces";
import { AiFillCheckCircle, AiOutlineCloseCircle, } from "react-icons/ai";
import { BsArrowLeft, BsDownload } from "react-icons/bs";
import apiRoutes from "../../../constants/apiRoutes";



interface Values {
    width: string;
    height: string;
    size: string;
    collectionName: string;
    isShuffle: boolean;
}

export interface configValsProps extends Values {
    layers: LayerInterface[];
}

interface IGenerateFormProps {
    onSubmit: (values: Values) => void
}

const GenerateForm: FC<IGenerateFormProps> = ({ onSubmit }) => {

    const { setIsOverlayVisible } = useContext(AppContext);

    /**
  * Validation Schema
  * */
    const ValidationSchema = Yup.object().shape({
        width: Yup.number()
            .typeError('only numbers')
            .min(10, "Too Short!")
            .max(1000, "Too Long!")
            .required("Required"),

        height: Yup.number()
            .typeError('only numbers')
            .min(10, "Too Short!")
            .max(1000, "Too Long!")
            .required("Required"),

        size: Yup.number()
            .typeError('only numbers')
            .min(5, "Too Short!")
            .max(50, "Currently You can Just generate up to 50 img")
            .required("Required"),

        collectionName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),

        description: Yup.string()

            .max(250, "Too Long!")

    });



    const MyTextArea = ({ label, ...props }: any) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and alse replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <div className={`mb-1`}>
                <label htmlFor={props.id || props.name} className={` text-gray-700`}>{label}</label>
                <textarea className={`border rounded-lg mt-2 border-gray-300 py-4 px-3 w-full`} {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error text-red-500 text-xs">{meta.error}</div>
                ) : null}
            </div>
        );
    };

    return <div style={{ maxHeight: "600px" }} className={`overflow-auto p-3`}>
        <Formik
            initialValues={{
                width: "",
                height: "",
                size: "",
                collectionName: "",
                description: "",
                isShuffle: false
            }}
            validationSchema={ValidationSchema}
            onSubmit={onSubmit}
        >
            <Form className={`flex flex-col`}>

                <div className={`flex justify-between w-full mb-5`}>
                    <InputFormik
                        label="Width (px)"
                        placeholder="Enter width"
                        name="width"
                        parentStyles={`mr-3`}
                    />
                    <InputFormik
                        label="Height (px)"
                        placeholder="Enter height"
                        name="height"
                        parentStyles={`ml-3`}
                    />

                </div>


                <InputFormik
                    label="Size"
                    placeholder="Enter size"
                    name="size"
                    parentStyles={`mb-5`}
                />

                <InputFormik
                    label="Collection Name"
                    placeholder="Enter collection name"
                    name="collectionName"
                    parentStyles={`mb-5`}
                />




                {/* <div className={`mb-5`}>
                    <h1 className={`mb-2 text-gray-700`}>Description</h1>
                    <textarea
                        placeholder="Enter a description"
                        className={`border rounded-lg border-gray-300 py-4 px-3 w-full`}

                        onChange={(e: React.FormEvent<HTMLInputElement>) => setWidth(e.currentTarget.value)}
                    />
                </div> */}

                <MyTextArea
                    label="Description"
                    name="description"
                    rows="3"
                    placeholder="Enter a description"
                />

                <div className={`flex items-center text-gray-700`}>
                    <Field type="checkbox" id="isShuffle" name="isShuffle" className="cursor-pointer" />
                    <label htmlFor="isShuffle" className={`ml-2 cursor-pointer`} >Shuffle</label>
                </div>





                <div className={`mt-5 flex items-center w-full  `}>


                    <Button
                        onClick={() => setIsOverlayVisible(false)}
                        label="Cancel"
                        styles={`bg-gray-200 hover:bg-gray-300 text-black px-16 py-4 rounded-lg mr-1 w-1/2`}
                    />
                    <Button

                        loading={false}
                        type="submit"
                        label="Start"
                        styles={`bg-blue-400 hover:bg-blue-300 px-16 py-4 rounded-lg text-white ml-1 w-1/2`}
                    />
                </div>
            </Form>
        </Formik>

    </div>
}



const GenerateFormFinished = ({ data }: any) => {

    /**
     * Download files: images & json
     * */

    const handleDownloadZipFiles = () => {

        var zip = new JSZip();

        const {
            imgs,
            metadataList,
            allSingleMetaData
        }: any = data;


        /** make zip for images folder **/
        var images: any = zip.folder("images");
        imgs.forEach((img: any, index: number) => images.file(`${index + 1}.png`, img.data, { base64: true }))


        /** make zip for metadata **/
        var json: any = zip.folder("json");
        json.file("_metadata.json", metadataList);


        /* make zip for json folder */
        allSingleMetaData.forEach((singleMataData: string, index: number) => json.file(`${index + 1}.json`, singleMataData));


        /** save files to local **/
        zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, "output.zip"))

    }

    return <>
        <div className={`text-green-400`}>
            <AiFillCheckCircle size={120} />
        </div>
        <h1 className={`mt-2 font-bold`}>Finished</h1>


        <div
            onClick={handleDownloadZipFiles}
            title="Download Zip File"
            className={`flex bg-black border-2 border-black hover:text-black transitio cursor-pointer hover:bg-white text-white px-16 py-5 rounded-lg mt-14`}>
            <BsDownload size={25} />
            <h1 className={`ml-3 text-lg`}>Download (.zip)</h1>
        </div>
    </>
}


interface IError {
    error: string;
    status: number
}
const GenerateFormErr = ({ err }: { err: IError | null }) => {

    return <>
        <div className={`text-red-400`}>
            <AiOutlineCloseCircle size={120} />
        </div>
        <h1 className={`mt-2 font-bold text-red-400`}>Error</h1>
        {err && <h1 className={`mt-2 text-red-500`}>{err.status === 500 ? "Something went wrong!" : err.error}</h1>}

        <h1 className={`mt-4`}>Try again!.</h1>
    </>
}


const GenerateFormProccessing = () => {
    return <>
        <Loader size={70} color="text-black" />
        <div className={`mt-4 text-center`}>
            <h1 className={`font-bold`}>Generating...</h1>
            <h1 className={`text-gray-600 mt-10`}>This is may take a while</h1>
        </div>
    </>
}

const Generate = () => {

    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [data, setData] = useState([]);
    const [error, setError] = useState<{ error: string, status: number } | null>()


    // call it if request succeeded or failed
    const finish = () => {
        // hide loader
        setLoading(false)

        // allow download button to rise
        setFinished(true)
    }

    const handleOnSubmit = async (values: Values) => {

        const configVals = { layers, ...values };

        try {

            // show loader
            setLoading(true)

            // send config value to server
            const { data } = await axios.post(apiRoutes.generate, configVals)
            setData(data)

            finish()


        } catch (err: any) {

            finish()
            console.log()
            const { data, status } = err.response

            setError({
                error: data.error || "",
                status
            })

        }

    }

    // Reset every
    const handleReset = () => {
        setFinished(false);
        setLoading(false);
        setData([])
        setError(null)
    }



    const layers = [
        {
            folderName: "bgs",
            imgs: [
                {
                    filename: 'pink#2.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fpink%232.png?alt=media&token=83fee278-440b-4281-b6e7-5ebfe5c0581f",
                },
                {
                    filename: 'purple#3.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fpurple%233.png?alt=media&token=0e5505e3-a938-4d2e-a900-e50ff261bf5d",
                },
                {
                    filename: 'yellow#1.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fyellow%231.png?alt=media&token=a13c7ac6-88b7-4235-b4fb-bbd82886ea30"

                },

            ]
        },
        {
            folderName: "body",
            imgs: [
                {
                    filename: 'Untitled#1.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FGreen%231.png?alt=media&token=6042142c-9c4f-4d03-8907-973414366dc9"
                },
                {
                    filename: 'Untitled#2.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPink%231.png?alt=media&token=73c41f95-0e85-4908-a597-646561292309"
                },
                {
                    filename: 'Untitled#3.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPurple%231.png?alt=media&token=a8d42354-b190-4741-803a-9614321ec9ff"

                },
            ]
        },];







    return <div >

        <h1 className={`text-lg pb-3 mb-2 border-b font-bold`}>Generate</h1>
        {!loading && !finished
            ? <GenerateForm onSubmit={handleOnSubmit} />
            : <div className={`w-80 h-80`}>
                <Center styles="flex-col h-full">

                    {!finished
                        ? <GenerateFormProccessing />
                        : <Center styles={`flex-col`}>
                            {error
                                ? <GenerateFormErr err={error} />
                                : <GenerateFormFinished data={data} />
                            }
                            <button
                                onClick={handleReset}
                                className={`flex items-center mt-5 text-blue-500 hover:text-blue-700`}>
                                <BsArrowLeft />
                                <h1 className={`ml-2`}>Return</h1>
                            </button>

                        </Center>
                    }

                </Center>
            </div>
        }
        <style jsx >{`
            
            /* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #ddd; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
          `}</style>
    </div>

}

export default Generate;
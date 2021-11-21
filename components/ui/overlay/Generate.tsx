
import { FC, useContext } from "react";
import AppContext from "../../../contexts/AppContext";
import Button from "../Button";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup'
import Loader from "../Loader";
import Center from "../../common/Center";
import InputFormik from "../form/InputFormik";

interface Values {
    width: string;
    height: string;
    size: string;
    collectionName: string;
    ipfsUri: string;
    isShuffle: boolean;
}



const Generate = () => {

    const { setIsOverlayVisible } = useContext(AppContext);

    // const [width, setWidth] = useState('')

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

        ipfsUri: Yup.string()
            .min(2, "Too Short!")



    });


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
        },]



    return <div >



        <h1 className={`text-lg pb-3 mb-2 border-b font-bold`}>Generate</h1>
        {!false ?
            <div style={{ maxHeight: "600px" }} className={`overflow-auto p-3`}>
                <Formik
                    initialValues={{
                        width: "",
                        height: "",
                        size: "",
                        collectionName: "",
                        ipfsUri: "",
                        isShuffle: false
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 500);
                        const configVals = {
                            layers,
                            ...values
                        }
                        console.log(configVals)
                    }}
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




                        {/* <InputForm
                        label="IPFS Uri"
                        placeholder="Enter ipfs uri"
                        name="ipfsUri"
                        parentStyles={`mb-5`}
                    /> */}



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
            : <div className={`w-80 h-80`}>
                <Center styles="flex-col h-full">


                    <Loader size={60} color="text-black" />
                    <div className={`mt-4 text-center`}>
                        <h1>Generating...</h1>
                        <h1 className={`text-gray-400 mt-10`}>This is may take a while</h1>
                    </div>

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
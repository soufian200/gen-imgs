import { Field, Form, Formik, useField } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import generateFormSchema from "../../../lib/schemas/generateFormSchema";
import { Values } from "../../../pages/c/tools/generate";
import Button from "../Button";
import InputFormik from "../form/InputFormik";


interface IGenerateFormProps {
    onSubmit: (values: Values) => void
}


const GenerateForm: FC<IGenerateFormProps> = ({ onSubmit }) => {


    const router = useRouter();



    return <div className={`max-w-xl border bg-white rounded-lg p-4 mx-auto`}>
        <Formik
            initialValues={{
                width: "",
                height: "",
                size: "",
                collectionName: "",
                description: "",
                isShuffle: false
            }}
            validationSchema={generateFormSchema}
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
                        onClick={() => router.back()}
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

const MyTextArea = ({ label, ...props }: any) => {

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

export default GenerateForm;
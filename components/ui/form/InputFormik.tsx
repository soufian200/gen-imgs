import { Field, ErrorMessage } from 'formik';
import { FC } from 'react';

interface InputFormProps {
    label: string;
    name: string;
    placeholder: string;
    parentStyles?: string;
}

const InputFormik: FC<InputFormProps> = ({ label, name, placeholder, parentStyles }) => {
    return <div className={parentStyles}>
        <h1 className={`mb-2 text-gray-700`}>{label}</h1>
        <Field
            id={name}
            name={name}
            placeholder={placeholder}
            className={`border mb-1 rounded-lg border-gray-300 p-3 w-full`}
        />
        <ErrorMessage
            name={name}
            component="div"
            className="text-red-400 text-xs"
        />
    </div>
}

export default InputFormik;
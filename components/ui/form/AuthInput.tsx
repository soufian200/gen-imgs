import { ErrorMessage, Field } from "formik"
import { ChangeEvent, FC } from "react"

interface IAuthInput {
    label: string
    Icon: React.ReactNode
    type?: string
    [x: string]: any;
    name: string;
    placeholder: string;
}

const AuthInput: FC<IAuthInput> = ({ label, Icon, type = "text", name, placeholder }) => {

    return <div className={`mb-4 w-96`}>
        <h1 className={` text-gray-700 capitalize`}>{label}</h1>
        <div className={`flex items-center border-b border-gray-400 mb-2 focus-within:border-blue-500  outline-none `}>
            {
                Icon
            }
            <Field
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                className={`border-none py-2  outline-none w-full ml-3 bg-transparent `}
            />
        </div>
        <ErrorMessage
            name={name}
            component="div"
            className="text-red-400 text-xs"
        />
    </div>

}

export default AuthInput;
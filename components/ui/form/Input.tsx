import { ChangeEvent, FC } from "react";


interface InputProps {
    label: string
    type?: string
    placeholder: string
    Icon: React.ReactNode
    onChange: (e: ChangeEvent) => void
    value: string
    name: string
}

const Input: FC<InputProps> = ({ label, type = "text", placeholder, Icon, onChange, value, name }) => {
    return <div className={`flex flex-col mt-10 `}>
        <label className={`capitalize`}>{label}:</label>
        <div className={`flex border-b border-gray-400 mb-2 focus-within:border-blue-500 py-2 outline-none pr-20`}>

            {Icon}
            <input
                type={type}
                placeholder={placeholder}
                className={`border-none outline-none w-full ml-3 bg-transparent`}
                onChange={onChange}
                value={value}
                name={name}
            />
        </div>
        {/* <p className={`text-red-500 text-sm mt-2 capitalize`}>something went wrong</p> */}
    </div>
}

export default Input;
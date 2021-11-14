import { ChangeEvent, FC } from "react";


interface InputProps {
    label: string
    Icon: React.ReactNode
    onChange: (e: ChangeEvent) => void
    value: string
    [x: string]: any;
}

const Input: FC<InputProps> = ({ label, Icon, onChange, value, ...props }) => {
    return <div className={`flex flex-col mt-10 `}>
        <label className={`capitalize`}>{label}:</label>
        <div className={`flex border-b border-gray-400 mb-2 focus-within:border-blue-500 py-2 outline-none pr-20`}>

            {Icon}
            <input
                className={`border-none outline-none w-full ml-3 bg-transparent`}
                onChange={onChange}
                value={value}

                {...props}
            />
        </div>
        {/* <p className={`text-red-500 text-sm mt-2 capitalize`}>something went wrong</p> */}
    </div>
}

export default Input;
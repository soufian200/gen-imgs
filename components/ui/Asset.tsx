import classNames from "classnames";
import { FC } from "react";

interface AssetProps {
    path?: string // TODO: make it required
    name: string
    date: string
    display: string
}
const Asset: FC<AssetProps> = ({ path, name, date, display }) => {

    return <div className={`mr-4 mt-4 border p-4 rounded-lg hover:shadow-lg cursor-pointer transition duration-300`}>
        <div className={classNames(`bg-gray-200 w-36 h-40 rounded-lg overflow-hidden `, { "h-192 w-192": display == "small" }, { "h-260 w-260": display == "large" })} ></div>
        <h1 className={`mt-3`}># {name}</h1>
        <p className={`text-xs text-gray-400`}>{date}</p>
    </div>
}

export default Asset;
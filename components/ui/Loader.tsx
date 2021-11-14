import { BiLoaderAlt } from "react-icons/bi"

const Loader = ({ size = 24, color = "text-white" }) => {
    return <BiLoaderAlt className={`animate-spin ${color}`} size={size} />
}

export default Loader;